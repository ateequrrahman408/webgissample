import { Component, OnInit, OnDestroy,NgZone,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // 🔥 Required for *ngIf
import { FormsModule } from '@angular/forms';     // 🔥 Required for [(ngModel)]
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Editor from '@arcgis/core/widgets/Editor';
import { Basemapservice } from '../../app/services/basemapservice';
import { Masjidservice } from '../../app/services/masjidservice';

@Component({
  selector: 'app-viewmap',
  standalone: true, // Agar standalone hai toh
  imports: [CommonModule, FormsModule], // 🔥 In dono ko add kiya form chalane ke liye
  templateUrl: './viewmap.html',
  styleUrl: './viewmap.css',
})
export class Viewmap implements OnInit, OnDestroy {

  map!: Map;
  view!: MapView;
  editableLayer!: FeatureLayer;

  // 🔥 FIX 1: Missing Class Variables ko yahan declare kiya
  isPanelOpen = false;
  selectedMasjidId!: number;
  selectedMasjidName = '';
  originalName = '';
  selectedOsmId!: number;
selectedAmenity = '';
selectedReligion = '';

  constructor(
    private mapService: Basemapservice, 
    private masjidService: Masjidservice,private zone: NgZone,private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.editableLayer = new FeatureLayer({
      url: 'https://localhost:6443/arcgis/rest/services/csharp/ghmcMasjids/FeatureServer/0',
      outFields: ["*"],
      title: "GHMC Masjids",
      formTemplate: {
        title: "Update Masjid Details",
        elements: [
          { type: "field", fieldName: "name", label: "Masjid Name" },
          { type: "field", fieldName: "religion", label: "Religion" },
          { type: "field", fieldName: "amenity", label: "Amenity" },
        ]
      }
    });

    this.map = new Map({
      basemap: "streets",
      layers: [this.editableLayer]
    });
    this.mapService.setMap(this.map);

    this.view = new MapView({
      container: 'map',
      map: this.map,
      center: [78.4867, 17.3850], // Hyderabad center par rakha
      zoom: 12
    });

    this.view.when(() => {
      // Agar aap chahein toh is widget ko comment out bhi kar sakte hain agar sirf custom form chalana hai
      const editorWidget = new Editor({
        view: this.view,
        layerInfos: [{
          layer: this.editableLayer,
          enabled: true,
          addEnabled: true,
          updateEnabled: true,
          deleteEnabled: true
        }]
      });
      // this.view.ui.add(editorWidget, "top-right");
    });

    // Custom click event without widget 
    this.view.on("click", async (event) => {
      try {
          this.zone.run(()=>{
            this.isPanelOpen = false;
          })
          this.cdr.detectChanges();

        const response = await this.view.hitTest(event,{include: [this.editableLayer]});
        console.log("Fresh HitTest results:", response.results);
        
        if (!response.results || response.results.length === 0) {
      console.log("Khaali jagah par click hua, koi feature nahi mila.");
      return;
    }

        let clickedGraphic: any = null;
        for (const result of response.results) {
          const targetLayer = (result as any).layer || (result as any).graphic?.layer;
          
          // 🔥 FIX 2: Layer reference ko 'this.editableLayer' se match kiya
          if (targetLayer && (targetLayer === this.editableLayer || targetLayer.title === "GHMC Masjids")) {
            clickedGraphic = (result as any).graphic;
            break;
          }
        }

        if (clickedGraphic) {
          const attributes = clickedGraphic.attributes;

          this.zone.run(()=>{

     this.selectedMasjidId = attributes?.objectid ?? attributes?.OBJECTID;
          this.selectedMasjidName = attributes?.name ?? attributes?.NAME ?? '';
          // 🔥 NAYE FIELDS EXTRACT KIYE CASING SAFETY KE SAATH
    this.selectedOsmId = attributes?.osm_id ?? attributes?.OSM_ID ?? 0;
    this.selectedAmenity = attributes?.amenity ?? attributes?.AMENITY ?? '';
    this.selectedReligion = attributes?.religion ?? attributes?.RELIGION ?? '';
          this.originalName = this.selectedMasjidName; 

          this.isPanelOpen = true; // Form panel open hoga
          console.log("Successfully shifted to New Object ID:", this.selectedMasjidId);

          })
          this.cdr.detectChanges();
     
        }
        else {
      console.log("Click toh hua par hamari Layer ka point touch nahi hua.");
    }

      } catch (error) {
        console.error("HitTest Error:", error);
      }
    });
  } // 👈 ngOnInit yahan close ho raha hai

  // 🔥 FIX 3: In functions ko class ke andar sahi position par rakha
  submitForm(): void {
    // if (!this.selectedMasjidName.trim()) {
    //   alert("Masjid name cannot be empty!");
    //   return;
    // }

    // if (this.selectedMasjidName === this.originalName) {
    //   alert("Aapne koi badlav nahi kiya hai.");
    //   return;
    // }

    // C# API ko call karna data save karne ke liye
    this.masjidService.updateMasjidName(this.selectedMasjidId, this.selectedMasjidName,this.selectedOsmId,this.selectedAmenity,this.selectedReligion).subscribe({
      next: (res) => {
        alert(res.message); 
        this.isPanelOpen = false; 
        this.cdr.detectChanges();
        this.editableLayer.refresh(); // 🔥 layer name fixed here too
      },
      error: (err) => {
        console.error("C# Backend Error:", err);
        alert("Failed to save data to database.");
      }
    });
  }

  closePanel(): void {
    this.zone.run(()=>{
  this.isPanelOpen = false;
    })
  this.cdr.detectChanges();

  }

  ngOnDestroy(): void {
    if (this.view) {
      this.view.destroy();
    }
  }
} // 👈 Pura component yahan end ho raha hai
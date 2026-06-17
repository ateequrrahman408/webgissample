import { Component } from '@angular/core';
import { Basemapservice } from '../../app/services/basemapservice';

 
@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  constructor(private mapService: Basemapservice) {}

    satelliteMap() {

          console.log('Satellite clicked');

    this.mapService.changeBasemap('satellite');
  }
 osmMap() {
    this.mapService.changeBasemap('osm');
  }


}

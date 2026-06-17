import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Basemapservice {
  map: any;

  setMap(map: any) {
    this.map = map;
  }

  changeBasemap(basemap: string) {
    if (this.map) {
      this.map.basemap = basemap;
    }
    else {
      console.log('Map not found');
    }
  }



}

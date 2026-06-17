import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Masjidservice {

private apiUrl='https://localhost:7163/api/Masjid';

constructor (private http:HttpClient){}
getMasjids(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

updateMasjidName(id: number, updatedName: string,osmId: number, amenity: string, religion: string): Observable<any> {
    // Body ke andar keys ka naam exact C# DTO jaisa hona chahiye
    const body = { 
      objectid: id, 
      NewName: updatedName ,
      osm_id: osmId,
    amenity: amenity,
    religion: religion
    };
    return this.http.post(`${this.apiUrl}/UpdateMasjidName`, body);
  }



}

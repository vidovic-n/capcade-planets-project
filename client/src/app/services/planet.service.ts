import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { PlanetElement } from '../components/planet-list/planet-list.component';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  private apiUrl = 'http://localhost:3001/api/planets'; // zamijeni sa pravim URL-om

  constructor(private http: HttpClient) {}

//   createPlanet(formData: FormData) {
//     return this.http.post(this.apiUrl, formData);
//   }

 createPlanet(data: Object): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getAllPlanets() {
  return this.http.get<any[]>('http://localhost:3001/api/planets');
}

  getPlanetById(id: number): Observable<PlanetElement> {
    return this.http.get<PlanetElement>(`${this.apiUrl}/${id}`);
  }
}
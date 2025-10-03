import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PlanetElement } from '../components/planet-list/planet-list.component';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  private apiUrl = 'http://localhost:3001/api/planets';
  private planetsSubject = new BehaviorSubject<PlanetElement[]>([]);
  public planets$ = this.planetsSubject.asObservable();

  constructor(private http: HttpClient) { }


  getAllPlanets() {
    this.http.get<PlanetElement[]>('http://localhost:3001/api/planets').subscribe(
      (response) => {
        const converted = this.convertResponse(response);
        this.planetsSubject.next(converted);
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  convertResponse(response: PlanetElement[]): PlanetElement[] {
    return response.map((item) => {
      if (typeof item.distInMillionsKM === 'string') {
        const parsedDist = JSON.parse(item.distInMillionsKM);

        return {
          ...item,
          distInMillionsKM: parsedDist,
        };
      }
      return item;
    });
  }

  getPlanetById(id: number): Observable<PlanetElement> {
    return this.http.get<PlanetElement>(`${this.apiUrl}/${id}`);
  }

    createPlanet(data: Object): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

}
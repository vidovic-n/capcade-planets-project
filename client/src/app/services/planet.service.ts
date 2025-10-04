import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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
    this.http.get<PlanetElement[]>(this.apiUrl).subscribe(
      (response) => {
        const converted = this.convertResponse(response);
        this.planetsSubject.next(converted);
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  convertSinglePlanet(planet: PlanetElement): PlanetElement {
    if (typeof planet.distInMillionsKM === 'string') {
        const parsedDist = JSON.parse(planet.distInMillionsKM);
        return {
          ...planet,
          distInMillionsKM: parsedDist,
        };
      }
      return planet;
  }

  convertResponse(response: PlanetElement[]): PlanetElement[] {
    return response.map((planet) => this.convertSinglePlanet(planet));
  }

  getPlanetById(id: number): Observable<PlanetElement> {
    return this.http.get<PlanetElement>(`${this.apiUrl}/${id}`);
  }

    addPlanet(newPlanet: FormData): Observable<PlanetElement> {
      return this.http.post<PlanetElement>(this.apiUrl, newPlanet).pipe(
        tap((createdPlanet) => {
          const current = this.planetsSubject.value;
          this.planetsSubject.next([...current, this.convertSinglePlanet(createdPlanet)]);
        })
      );
    }

    deletePlanet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
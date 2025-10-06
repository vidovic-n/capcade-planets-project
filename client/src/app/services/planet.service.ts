import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PlanetModel } from '../planetModel';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  private apiUrl = 'http://localhost:3001/api/planets';
  private planetsSubject = new BehaviorSubject<PlanetModel[]>([]);
  public planets$ = this.planetsSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAllPlanets() {
    this.http.get<PlanetModel[]>(this.apiUrl).subscribe(
      (response) => {
        const converted = this.convertResponse(response);
        this.planetsSubject.next(converted);
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  getPlanetById(id: number): Observable<PlanetModel> {
    return this.http.get<PlanetModel>(`${this.apiUrl}/${id}`);
  }

  addPlanet(newPlanet: FormData): Observable<PlanetModel> {
    return this.http.post<PlanetModel>(this.apiUrl, newPlanet).pipe(
      tap((createdPlanet) => {
        const current = this.planetsSubject.value;
        this.planetsSubject.next([...current, this.convertSinglePlanet(createdPlanet)]);
      })
    );
  }

  deletePlanet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updatePlanet(id: number, updatedPlanet: FormData): Observable<PlanetModel> {
    return this.http.put<PlanetModel>(`${this.apiUrl}/${id}`, updatedPlanet).pipe(
      tap((updated) => {
        const current = this.planetsSubject.value;
        const updatedList = current.map((planet) =>
          planet.id === updated.id ? updated : planet
        );
        this.planetsSubject.next(updatedList);
      })
    );
  }

  convertSinglePlanet(planet: PlanetModel): PlanetModel {
    if (typeof planet.distInMillionsKM === 'string') {
      const parsedDist = JSON.parse(planet.distInMillionsKM);
      return {
        ...planet,
        distInMillionsKM: parsedDist,
      };
    }
    return planet;
  }

  convertResponse(response: PlanetModel[]): PlanetModel[] {
    return response.map((planet) => this.convertSinglePlanet(planet));
  }

}
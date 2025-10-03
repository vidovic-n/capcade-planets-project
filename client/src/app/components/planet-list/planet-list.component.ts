import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { AddNewPlanetModalComponent } from '../add-new-planet-modal/add-new-planet-modal.component';

export interface PlanetElement {
  description: string;
  distInMillionsKM: {
    fromSun: number,
    fromEarth: number
  },
  id: number;
  imageName: string;
  imageUrl: string;
  planetColor: string,
  planetName: string,
  planetRadiusKM: number
}


@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss'],
  standalone: true,
  imports: [AddNewPlanetModalComponent, CommonModule, MatTableModule, MatCardModule, RouterModule, MatButtonModule, MatTableModule, MatSortModule, CommonModule, MatIconModule, MatCardModule, RouterModule]
})
export class PlanetListComponent {
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  dataSource = new MatTableDataSource<PlanetElement>();
  displayedColumns: string[] = ['planetName', 'planetColor', 'planetRadiusKM', 'fromSun', 'fromEarth'];
  view: string = 'table';
  showModal = false;

  constructor(private http: HttpClient, private router: Router) { }

   ngOnInit(): void {
    this.http.get<PlanetElement[]>('http://localhost:3001/api/planets').subscribe(
      (response) => {
        this.dataSource.data = this.convertResponse(response);
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openPlanetDetails(id: number) {
    this.router.navigate(['/planet', id]);
  }

}

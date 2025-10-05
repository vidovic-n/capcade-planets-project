import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule, Router } from '@angular/router';
import { AddNewPlanetModalComponent } from '../add-new-planet-modal/add-new-planet-modal.component';
import { PlanetService } from '../../services/planet.service';
import { PlanetModel } from '../../planetModel';


@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss'],
  standalone: true,
  imports: [AddNewPlanetModalComponent, CommonModule, MatTableModule, RouterModule, MatButtonModule, MatSortModule, MatIconModule, MatCardModule]
})
export class PlanetListComponent {
  @ViewChild(MatSort) sort: MatSort = new MatSort;
  dataSource = new MatTableDataSource<PlanetModel>();
  displayedColumns: string[] = ['planetName', 'planetColor', 'planetRadiusKM', 'fromSun', 'fromEarth'];
  view: string = 'table';
  showModal = false;

  constructor(private router: Router, private planetService: PlanetService) { }

  ngOnInit(): void {
    this.planetService.getAllPlanets();

    this.planetService.planets$.subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
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

  onRowClicked(row: PlanetModel) {
    this.router.navigate(['/planet', row.id]);
  }

}

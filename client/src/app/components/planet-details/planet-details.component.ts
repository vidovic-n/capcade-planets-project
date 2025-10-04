import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanetService } from '../../services/planet.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PlanetElement } from '../planet-list/planet-list.component';
import { DeletePlanetModalComponent } from '../delete-planet-modal/delete-planet-modal.component';
import { EditPlanetModalComponent } from '../edit-planet-modal/edit-planet-modal.component';
import { PlanetFormData } from '../add-new-planet-modal/add-new-planet-modal.component';

@Component({
  selector: 'app-planet-details',
  standalone: true,
  templateUrl: './planet-details.component.html',
  styleUrl: './planet-details.component.scss',
  imports: [DeletePlanetModalComponent, EditPlanetModalComponent, CommonModule, RouterModule, MatCardModule],
})
export class PlanetDetailsComponent implements OnInit {

  planetId!: number;
  showModal = false;
  showEditModal = false;
  planet: PlanetFormData | null = null;
  planetToDelete: PlanetElement | null = null;
  planetData: PlanetElement = {
    id: 0,
    imageUrl: '',
    imageName: '',
    planetName: '',
    description: '',
    planetRadiusKM: 0,
    planetColor: '',
    distInMillionsKM: {
      fromSun: 0,
      fromEarth: 0,
    },
  };

  constructor(
    private route: ActivatedRoute,
    private planetService: PlanetService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.planetId = +this.route.snapshot.paramMap.get('id')!;
    this.planetService.getPlanetById(this.planetId).subscribe(data => {
      this.planetData = this.planetService.convertSinglePlanet(data);
    });
  }

  openDeleteModal() {
    this.planetToDelete = this.planetService.convertSinglePlanet(this.planetData);
    console.log("planetTodelete", this.planetToDelete)
    this.showModal = true;
  }

  openEditModal() {
    this.showEditModal = true;
  }

  onDeleteConfirmed(planetId: number) {
    this.planetService.deletePlanet(planetId).subscribe({
      next: () => {
        this.showModal = false;
        this.router.navigate(['']);
      },
      error: (err) => {
        console.error('Error deleting planet:', err);
      }
    });
  }

  onDeleteCancelled() {
    this.showModal = false;
  }

  closeModal() {
    this.showModal = false;
  }

}

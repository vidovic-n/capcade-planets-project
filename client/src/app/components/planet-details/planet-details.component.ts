import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanetService } from '../../services/planet.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DeletePlanetModalComponent } from '../delete-planet-modal/delete-planet-modal.component';
import { EditPlanetModalComponent } from '../edit-planet-modal/edit-planet-modal.component';
import { PlanetModel } from '../../planetModel';

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
  planet: PlanetModel | null = null;
  planetToDelete: PlanetModel | null = null;
  planetData: PlanetModel = {
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
    this.showModal = true;
  }

  openEditModal() {
    this.planetToDelete = this.planetService.convertSinglePlanet(this.planetData);
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

  onEditConfirmed(editedData: PlanetModel) {
    const formData = new FormData();
    formData.append('planetName', editedData.planetName);
    formData.append('description', editedData.description);
    formData.append('planetRadiusKM', editedData.planetRadiusKM!.toString());
    formData.append('planetColor', editedData.planetColor);
    formData.append('imageName', editedData.imageName);
    formData.append('distInMillionsKM', JSON.stringify(editedData.distInMillionsKM));

    if (editedData.file) {
      formData.append('file', editedData.file)
    } else {
      formData.append('imageUrl', editedData.imageUrl)
    }

    this.planetService.updatePlanet(editedData.id, formData).subscribe(() => {
      this.showEditModal = false;
      this.router.navigate(['']);
    });
  }

  onEditCancelled() {
    this.showEditModal = false;
  }

  onDeleteCancelled() {
    this.showModal = false;
  }

  closeModal() {
    this.showModal = false;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

}

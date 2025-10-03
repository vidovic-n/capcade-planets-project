import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlanetService } from '../../services/planet.service';

export interface Distances {
  fromSun: number;
  fromEarth: number;
}

export interface PlanetFormData {
  id: number;
  imageFile: File | null;
  imageName: string;
  planetName: string;
  description: string;
  planetRadiusKM: number;
  planetColor: string;
  distInMillionsKM: Distances;
}

@Component({
  selector: 'app-add-new-planet-modal',
  standalone: true,
  templateUrl: './add-new-planet-modal.component.html',
  styleUrl: './add-new-planet-modal.component.scss',
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AddNewPlanetModalComponent {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();


  formData: PlanetFormData = {
    id: 0,
    imageFile: null,
    imageName: '',
    planetName: '',
    description: '',
    planetRadiusKM: 0,
    planetColor: '',
    distInMillionsKM: {} as Distances,
  };
  constructor(private planetService: PlanetService) { }

  openModal() {
    this.show = true;
  }

  cancel() {
    this.close.emit();
  }

  onFileSelected(event: any) {
    this.formData.imageFile = event.target.files[0];
  }

  create() {
    const planetObject = {
        imageFile: this.formData.imageFile,
        imageName: this.formData.imageFile != null ? this.formData.imageFile.name : '',
        planetName: this.formData.planetName,
        description: this.formData.description,
        planetRadiusKM: this.formData.planetRadiusKM,
        planetColor: this.formData.planetColor,
        distInMillionsKM: {
          fromSun: this.formData.distInMillionsKM.fromSun,
          fromEarth: this.formData.distInMillionsKM.fromEarth
        }
    }

    this.planetService.createPlanet(planetObject).subscribe({
      next: (response) => {
        console.log('Planet created:', response);
        this.close.emit(true);
      },
      error: (err) => {
        console.error('Error creating planet:', err);
        alert('Error creating planet!');
      }
    });
  }

}

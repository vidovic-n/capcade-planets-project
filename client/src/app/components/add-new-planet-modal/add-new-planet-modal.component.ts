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
  file?: File | null;
  imageUrl: string;
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

  constructor(private planetService: PlanetService) { }

  initialFormData: PlanetFormData = {
    id: 0,
    file: null,
    imageUrl: '',
    imageName: '',
    planetName: '',
    description: '',
    planetRadiusKM: 0,
    planetColor: '',
    distInMillionsKM: {
      fromSun: 0,
      fromEarth: 0
    },
  };

  formData = { ...this.initialFormData };

  cancel() {
    this.formData = { ...this.initialFormData };
    this.close.emit();
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.formData.file = input.files[0];
    } else {
      this.formData.file = null;
    }
  }

  create() {
    const data = new FormData()

    if (this.formData.file) {
      data.append('file', this.formData.file);
    }

    data.append('imageName', this.formData.file ? this.formData.file.name : '');
    data.append('planetName', this.formData.planetName);
    data.append('description', this.formData.description);
    data.append('planetRadiusKM', this.formData.planetRadiusKM.toString());
    data.append('planetColor', this.formData.planetColor);
    data.append('distInMillionsKM', JSON.stringify(this.formData.distInMillionsKM));

    this.planetService.addPlanet(data).subscribe({
      next: (response) => {
        console.log('Planet created:', response);
        this.formData = { ...this.initialFormData };
        this.close.emit(true);
      },
      error: (err) => {
        console.error('Error creating planet:', err);
        alert('Error creating planet!');
      }
    });
  }
}

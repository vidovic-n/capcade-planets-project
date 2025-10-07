import { Component,  EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlanetService } from '../../services/planet.service';
import { PlanetModel } from '../../models/planet.model';

@Component({
  selector: 'app-add-new-planet-modal',
  standalone: true,
  templateUrl: './add-new-planet-modal.component.html',
  styleUrl: './add-new-planet-modal.component.scss',
  imports: [
    CommonModule,
    FormsModule,
  ]
})

export class AddNewPlanetModalComponent {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();

  constructor(private planetService: PlanetService) { }

  formData: PlanetModel = {
    id: 0,
    file: null,
    imageUrl: '',
    imageName: '',
    planetName: '',
    description: '',
    planetRadiusKM: null,
    planetColor: '',
    distInMillionsKM: {
      fromSun: null,
      fromEarth: null
    },
  };

  onFileInput(): void {
  const fileInput = document.getElementById('imageFile') as HTMLInputElement;
  if (fileInput) {
    fileInput.click();
  }
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
    } else {
      console.log("File for sending not add")
    }

    data.append('imageName', this.formData.file ? this.formData.file.name : '');
    data.append('planetName', this.formData.planetName);
    data.append('description', this.formData.description);
    data.append('planetRadiusKM',  this.formData.planetRadiusKM ?  this.formData.planetRadiusKM!.toString() : '');
    data.append('planetColor', this.formData.planetColor);
    data.append('distInMillionsKM', JSON.stringify(this.formData.distInMillionsKM));

    this.planetService.addPlanet(data).subscribe({
      next: (response) => {
        this.close.emit(true);
      },
      error: (err) => {
        console.error('Error creating planet:', err);
        alert('Error creating planet!');
      }
    });
  }

  cancel() {
    this.close.emit();
  }

}


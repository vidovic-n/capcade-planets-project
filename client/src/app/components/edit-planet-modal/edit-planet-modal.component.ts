import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanetFormData } from '../add-new-planet-modal/add-new-planet-modal.component';
import { PlanetService } from '../../services/planet.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlanetElement } from '../planet-list/planet-list.component';

@Component({
  selector: 'app-edit-planet-modal',
  standalone: true,
  templateUrl: './edit-planet-modal.component.html',
  styleUrl: './edit-planet-modal.component.scss',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EditPlanetModalComponent {
  @Input() show: boolean = false;
  // @Output() close = new EventEmitter<boolean>();
  @Input() planetToDelete: PlanetElement | null = null;
  @Output() onConfirmEdit = new EventEmitter<PlanetFormData>();
  @Output() onCancelEdit = new EventEmitter<void>();

  constructor(private planetService: PlanetService, private route: ActivatedRoute,  private fb: FormBuilder) { }

  formData: PlanetFormData = {
    id: 0,
    file: null,
    imageName: '',
    imageUrl: '',
    planetName: '',
    description: '',
    planetRadiusKM: 0,
    planetColor: '',
    distInMillionsKM: {
      fromSun: 0,
      fromEarth: 0
    },
  };

  data = this.planetToDelete ?? {
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

  formGroup!: FormGroup;
    ngOnChanges(): void {
    if (this.planetToDelete) {
      console.log("Creating data for update: " + JSON.stringify(this.planetToDelete))
      this.data = {
        id: this.planetToDelete.id,
        file: this.planetToDelete.file ? this.planetToDelete.file : null,
        imageUrl: this.planetToDelete.file ? '' : this.planetToDelete.imageUrl,
        imageName: this.planetToDelete.imageName,
        planetName: this.planetToDelete.planetName,
        description: this.planetToDelete.description,
        planetRadiusKM: this.planetToDelete.planetRadiusKM,
        planetColor: this.planetToDelete.planetColor,
        distInMillionsKM: {
          fromSun: this.planetToDelete.distInMillionsKM.fromSun,
          fromEarth: this.planetToDelete.distInMillionsKM.fromEarth
        }
      };
      // this.data = JSON.parse(JSON.stringify(this.planetToDelete));
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

 editPlanet() {
    if (this.planetToDelete) {
      console.log("Updating record with: " + JSON.stringify(this.data))
      this.onConfirmEdit.emit(this.data);
    }
  }

  cancelEdit() {
    this.onCancelEdit.emit();
  }

}

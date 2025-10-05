import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanetService } from '../../services/planet.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlanetModel } from '../../planetModel';

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
  @Input() planetToDelete: PlanetModel | null = null;
  @Output() onConfirmEdit = new EventEmitter<PlanetModel>();
  @Output() onCancelEdit = new EventEmitter<void>();

  constructor(private planetService: PlanetService, private route: ActivatedRoute,  private fb: FormBuilder) { }

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
      this.data = {
        id: this.planetToDelete.id,
        imageUrl: this.data.file ? '' : this.planetToDelete.imageUrl,
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
    }
  }

  onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.data.file = input.files[0];
    } else {
      console.log("File not selected")
    }
  }

 editPlanet() {
    if (this.planetToDelete) {
      this.onConfirmEdit.emit(this.data);
    }
  }

  cancelEdit() {
    this.onCancelEdit.emit();
  }

}

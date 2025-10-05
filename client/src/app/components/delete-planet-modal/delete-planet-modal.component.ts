import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlanetModel } from '../../planetModel';

@Component({
  selector: 'app-delete-planet-modal',
  standalone: true,
  templateUrl: './delete-planet-modal.component.html',
  styleUrl: './delete-planet-modal.component.scss',
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DeletePlanetModalComponent {

  @Input() show: boolean = false;
  @Input() planetToDelete: PlanetModel | null = null;
  @Output() onConfirmDelete = new EventEmitter<number>();
  @Output() onCancel = new EventEmitter<void>();

  confirm() {
    if (this.planetToDelete) {
      this.onConfirmDelete.emit(this.planetToDelete.id);
    }
  }

  cancel() {
    this.onCancel.emit();
  }
}

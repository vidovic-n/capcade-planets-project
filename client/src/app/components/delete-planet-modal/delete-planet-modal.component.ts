import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  @Output() close = new EventEmitter<boolean>();

  deletePlanet() {

  }

  cancel() {

  }

}

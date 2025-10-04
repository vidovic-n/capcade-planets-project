import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-planet-modal',
  standalone: true,
  templateUrl: './edit-planet-modal.component.html',
  styleUrl: './edit-planet-modal.component.scss',
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class EditPlanetModalComponent {
   @Input() show: boolean = false;
  @Output() close = new EventEmitter<boolean>();

  deletePlanet() {

  }

  cancel() {

  }

}

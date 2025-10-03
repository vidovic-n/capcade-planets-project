import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanetService } from '../../services/planet.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-planet-details',
  standalone: true,
  templateUrl: './planet-details.component.html',
  styleUrl: './planet-details.component.scss',
  imports: [CommonModule, RouterModule],
})
export class PlanetDetailsComponent implements OnInit{

   planetId!: number;
  planetData: any;

  constructor(
    private route: ActivatedRoute,
    private planetService: PlanetService
  ) {}

  ngOnInit(): void {
     this.planetId = +this.route.snapshot.paramMap.get('id')!;
    this.planetService.getPlanetById(this.planetId).subscribe(data => {
      this.planetData = data;
    });
  }

}

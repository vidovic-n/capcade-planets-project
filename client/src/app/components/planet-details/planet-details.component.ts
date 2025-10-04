import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanetService } from '../../services/planet.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PlanetElement } from '../planet-list/planet-list.component';

@Component({
  selector: 'app-planet-details',
  standalone: true,
  templateUrl: './planet-details.component.html',
  styleUrl: './planet-details.component.scss',
  imports: [CommonModule, RouterModule, MatCardModule],
})
export class PlanetDetailsComponent implements OnInit {

  planetId!: number;
  planetData: PlanetElement = {
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
    private planetService: PlanetService
  ) { }

  ngOnInit(): void {
    this.planetId = +this.route.snapshot.paramMap.get('id')!;
    this.planetService.getPlanetById(this.planetId).subscribe(data => {
      this.planetData = data;
    });
  }

}

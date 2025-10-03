import { Routes } from '@angular/router';
import { PlanetDetailsComponent } from './components/planet-details/planet-details.component';
import { PlanetListComponent } from './components/planet-list/planet-list.component';


export const routes: Routes = [
  { path: '', component: PlanetListComponent  },
  { path: 'planet/:id', component: PlanetDetailsComponent },
];
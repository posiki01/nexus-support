import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Esto hace que el Home sea lo primero que se ve
  { path: '**', redirectTo: '' }
];
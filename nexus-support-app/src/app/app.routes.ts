import { Routes } from '@angular/router';
import { HomeComponent } from '../home.component';
import { ContactoComponent } from './contacto.component';
import { ServiciosComponent } from './servicios.component';
import { FavoritosComponent } from './favoritos.component';
import { DetalleServicioComponent } from './detalle-servicio.component';
import { AgregarServicioComponent } from './agregar-servicio.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'agregar', component: AgregarServicioComponent },
  { path: 'detalle/:id', component: DetalleServicioComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '**', redirectTo: '' }
];

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DataService, Servicio } from '../data.service';

@Component({
  selector: 'app-detalle-servicio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-servicio.component.html'
})
export class DetalleServicioComponent implements OnInit {
  servicio: Servicio | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.servicio = this.dataService.getServicioById(id);
  }

  getPrecioFormateado(): string {
    if (!this.servicio) return '';
    const precioLocal = (this.servicio.precio || 0).toLocaleString();
    const sufijo = this.servicio.categoria === 'Soporte' ? '/mes' : '';
    return `$${precioLocal}${sufijo}`;
  }

  toggleFavorito() {
    if (this.servicio) this.dataService.toggleFavorito(this.servicio.id);
  }

  esFavorito(): boolean {
    return this.servicio ? this.dataService.esFavorito(this.servicio.id) : false;
  }
}
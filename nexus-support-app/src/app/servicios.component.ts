import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Servicio } from '../data.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './servicios.component.html'
})
export class ServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
  filtro: string = '';

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.servicios = this.dataService.getServicios();
  }

  get serviciosFiltrados() {
    return this.servicios.filter(s => 
      s.nombre.toLowerCase().includes(this.filtro.toLowerCase()) ||
      s.categoria?.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  toggleFavorito(id: number) {
    this.dataService.toggleFavorito(id);
  }

  esFavorito(id: number): boolean {
    return this.dataService.esFavorito(id);
  }

  eliminarServicio(id: number, event: Event) {
    event.stopPropagation();
    if (confirm('¿Deseas eliminar este servicio?')) {
      this.dataService.eliminarServicio(id);
      this.servicios = this.dataService.getServicios();
    }
  }

  eliminarTodo() {
    if (confirm('¿Eliminar todos los servicios? Esta acción no se puede deshacer.')) {
      this.dataService.limpiarTodo();
      this.servicios = [];
    }
  }

  verDetalle(id: number) { 
    this.router.navigate(['/detalle', id]);
  }
}
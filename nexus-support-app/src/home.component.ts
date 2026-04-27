import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Servicio } from './data.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink], // Importamos RouterLink para habilitar la navegación en el HTML
  templateUrl: './home.component.html',
  styleUrl: './app/app.css' // Aseguramos que tome los estilos base
})
export class HomeComponent implements OnInit {
  serviciosDestacados: Servicio[] = [];

  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Consumimos el método solicitado para obtener los 3 mejores
    this.serviciosDestacados = this.dataService.getDestacados(3);
  }

  /**
   * Replica la lógica de formato de precio que tenías en main.js
   */
  getPrecioFormateado(servicio: Servicio): string {
    const precioLocal = (servicio?.precio || 0).toLocaleString();
    const sufijo = servicio?.categoria === 'Soporte' ? '/mes' : '';
    return `$${precioLocal}${sufijo}`;
  }

  verDetalle(id: number): void {
    this.router.navigate(['/detalle', id]);
  }
}
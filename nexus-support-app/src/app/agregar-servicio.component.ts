import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService, Servicio } from '../data.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-agregar-servicio',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agregar-servicio.component.html'
})
export class AgregarServicioComponent {
  nuevoServicio: Omit<Servicio, 'id' | 'rating' | 'caracteristicas'> = {
    nombre: '',
    categoria: 'Soporte',
    precio: 0,
    imagen: '',
    descripcion: ''
  };

  confirmacion = { visible: false, exito: false, mensaje: '' };

  constructor(private dataService: DataService, private router: Router) {}

  agregar() {
    if (this.nuevoServicio.nombre.length < 3) {
      this.mostrarMsg(false, 'Nombre debe tener al menos 3 caracteres');
      return;
    }
    if (this.nuevoServicio.precio <= 0) {
      this.mostrarMsg(false, 'Precio válido requerido');
      return;
    }
    if (this.nuevoServicio.descripcion.length < 10) {
      this.mostrarMsg(false, 'Descripción debe tener al menos 10 caracteres');
      return;
    }

    this.dataService.agregarServicio(this.nuevoServicio as any);
    this.mostrarMsg(true, '✓ Servicio agregado exitosamente!');
    
    setTimeout(() => {
      this.router.navigate(['/servicios']);
    }, 1500);
  }

  private mostrarMsg(exito: boolean, msg: string) {
    this.confirmacion = { visible: true, exito, mensaje: msg };
    setTimeout(() => this.confirmacion.visible = false, 3000);
  }
}
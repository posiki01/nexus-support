import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contacto.component.html'
})
export class ContactoComponent {
  contacto = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  confirmacion = {
    visible: false,
    exito: false,
    mensaje: ''
  };

  enviarFormulario() {
    // Validaciones (Lógica migrada de contacto.js)
    if (this.contacto.nombre.trim().length < 3) {
      this.mostrarMensaje(false, 'Nombre debe tener al menos 3 caracteres');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.contacto.email)) {
      this.mostrarMensaje(false, 'Correo electrónico válido requerido');
      return;
    }

    if (this.contacto.mensaje.trim().length < 10) {
      this.mostrarMensaje(false, 'Mensaje debe tener al menos 10 caracteres');
      return;
    }

    // Si todo está bien
    this.mostrarMensaje(true, '✓ Mensaje enviado con éxito! Te contactaremos pronto.');
    this.contacto = { nombre: '', email: '', mensaje: '' }; // Reset
  }

  private mostrarMensaje(exito: boolean, msg: string) {
    this.confirmacion = { visible: true, exito, mensaje: msg };
    setTimeout(() => {
      this.confirmacion.visible = false;
    }, 4000);
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Servicio } from '../data.service';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favoritos.component.html'
})
export class FavoritosComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  get favoritos(): Servicio[] {
    return this.dataService.getFavoritos();
  }

  eliminarFavorito(id: number) {
    this.dataService.toggleFavorito(id);
  }
}
import { Component } from '@angular/core';
// import { CarteleraResponse } from './interfaces/cartelera-response-';
import { PeliculasService } from './services/peliculas.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'peliculas';

  constructor(private peliculasService: PeliculasService) {
    this.peliculasService.getCartelera().subscribe((resp) => {
      console.log(resp);
    });
  }
}

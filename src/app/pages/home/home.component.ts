import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response-';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const position =
      (document.documentElement.scrollTop || document.body.scrollTop) + 1300;

    const maxPosition =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    // console.log('position', position, 'maxPostion', maxPosition);

    if (position > maxPosition) {
      if (this.peliculasService.cargando) {
        return;
      }
      // console.log('llamar servicio');
      this.peliculasService.getCartelera().subscribe((movies) => {
        this.movies.push(...movies);
      });
    }
  }

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasService.getCartelera().subscribe((movies) => {
      // console.log(resp);
      this.movies = movies;
      this.moviesSlideshow = movies;
    });
  }

  ngOnDestroy() {
    this.peliculasService.resetPage();
  }
}

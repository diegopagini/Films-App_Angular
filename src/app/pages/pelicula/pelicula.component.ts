import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cast } from 'src/app/interfaces/movie-cast';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { combineLatest } from 'rxjs/operators';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
  pelicula: MovieResponse;
  cast: Cast[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private peliculasService: PeliculasService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    // combineLatest([
    //   this.peliculasService.getPeliculaDetalle(id),
    //   this.peliculasService.getCast(id)
    // ]).subscribe((objeto) => console.log(objeto));

    //con desestructuracion:
    // const {id} = this.activatedRoute.snapshot.params;

    this.peliculasService.getPeliculaDetalle(id).subscribe((movie) => {
      if (!movie) {
        this.router.navigateByUrl('/home');
        return;
      }
      // console.log(movie);||
      this.pelicula = movie;
    });

    this.peliculasService.getCast(id).subscribe((cast) => {
      // console.log(cast);
      this.cast = cast.filter((actor) => actor.profile_path !== null);
    });
  }

  regresar() {
    this.location.back();
  }
}

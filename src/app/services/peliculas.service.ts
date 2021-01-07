import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response-';
import { tap, map, catchError } from 'rxjs/operators';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, MovieCast } from '../interfaces/movie-cast';
@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  // tslint:disable-next-line: no-inferrable-types
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  // tslint:disable-next-line: no-inferrable-types
  public cargando: boolean = false;

  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  get params() {
    return {
      api_key: 'b66ac5ebbf6d1157fd7f203a0224b424',
      language: 'es-ES',
      page: this.carteleraPage.toString(),
    };
  }

  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }

    this.cargando = true;
    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing?`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }

  buscarPeliculas(texto: string): Observable<Movie[]> {
    const params = { ...this.params, page: '1', query: texto };
    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/search/movie`, { params })
      .pipe(
        map((resp) => {
          return resp.results;
        })
      );
  }

  resetPage() {
    this.carteleraPage = 1;
  }

  getPeliculaDetalle(id: string) {
    return this.http
      .get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
        params: this.params,
      })
      .pipe(catchError((err) => of(null)));
  }

  getCast(id: string): Observable<Cast[]> {
    return this.http
      .get<MovieCast>(`${this.baseUrl}/movie/${id}/credits`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.cast),
        catchError((err) => of([]))
      );
  }
}

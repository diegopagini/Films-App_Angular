import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarteleraResponse } from '../interfaces/cartelera-response-';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;

  constructor(private http: HttpClient) {}

  get params() {
    return {
      api_key: 'b66ac5ebbf6d1157fd7f203a0224b424',
      language: 'es-ES',
      page: this.carteleraPage.toString(),
    };
  }

  getCartelera(): Observable<CarteleraResponse> {
    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing?`, {
        params: this.params,
      })
      .pipe(
        tap(() => {
          this.carteleraPage += 1;
        })
      );
  }
}

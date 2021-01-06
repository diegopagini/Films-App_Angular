import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarteleraResponse } from '../interfaces/cartelera-response-';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  constructor(private http: HttpClient) {}

  getCartelera(): Observable<CarteleraResponse> {
    return this.http.get<CarteleraResponse>(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=b66ac5ebbf6d1157fd7f203a0224b424&language=es-ES&page=1'
    );
  }
}

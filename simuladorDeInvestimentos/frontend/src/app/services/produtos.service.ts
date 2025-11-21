import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private baseUrl = 'http://localhost:3000/produtos-recomendados';

  constructor(private http: HttpClient) {}

  /**
   * Busca produtos recomendados por perfil (ex: 'conservador','moderado','agressivo')
   */
  getByPerfil(perfil: string): Observable<Product[]> {
    const perfilNormalized = (perfil || 'conservador').toString().toLowerCase();
    return this.http.get<Product[]>(`${this.baseUrl}/${perfilNormalized}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shop } from '../models/shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiUrl = 'http://localhost:8080/api/shops';

  constructor(private http: HttpClient) { }

  getShops(): Observable<Shop[]> {
    console.log('ShopService: Fetching shops from API');
    return this.http.get<Shop[]>(this.apiUrl);
  }

  getShop(id: number): Observable<Shop> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Shop>(url);
  }

  addShop(shop: Shop): Observable<Shop> {
    return this.http.post<Shop>(this.apiUrl, shop);
  }

  updateShop(id: number, shop: Shop): Observable<Shop> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Shop>(url, shop);
  }

  deleteShop(id: number): Observable<{}> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
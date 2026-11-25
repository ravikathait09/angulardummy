import { Service } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductsFromApi(
  limit: number = 10,
  skip: number = 0,
  searchTerm: string = ''
): Observable<any> {

  let params = new HttpParams()
    .set('limit', limit)
    .set('skip', skip);

  const url = searchTerm.trim()
    ? 'https://dummyjson.com/products/search'
    : 'https://dummyjson.com/products';

  if (searchTerm.trim()) {
    params = params.set('q', searchTerm.trim());
  }

  return this.http.get<any>(url, { params }).pipe(
    catchError(error => {
      console.error('API Error:', error);
      return throwError(() => error);
    })
  );
}



  private products: Product[] = [
    {
      id: 1,
      name: 'Nike Shoes',
      category: 'Footwear',
      price: 2499,
      stock: 20,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Smart Watch',
      category: 'Electronics',
      price: 3999,
      stock: 15,
      status: 'Active'
    },
    {
      id: 3,
      name: 'T-Shirt',
      category: 'Clothing',
      price: 799,
      stock: 0,
      status: 'Out of Stock'
    }
  ];

  


  getProducts(): Product[] {
    return this.products;
  }

  

  searchProducts(searchText: string) {
  return this.http.get<any>(
    `https://dummyjson.com/products/search?q=${encodeURIComponent(searchText)}`
  );
}

  addProduct(product: Product): void {
    this.products.push(product);
  }

  updateProduct(updatedProduct: Product): void {
    this.products = this.products.map(product =>
      product.id === updatedProduct.id
        ? updatedProduct
        : product
    );
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(
      product => product.id !== id
    );
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }

  productList() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteProducts(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);

  }
  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }

  updateProduct(product: product) {
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product);
  }

  popularProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');

  }

  trendyProducts() {
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');

  }

  searchProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      console.log("Cart data local " + localCart);
      localStorage.setItem('localCart', JSON.stringify([data]));
    }
    else {
      console.log("data-- " + JSON.stringify(data));
      console.log("localCart-- " + localCart);

      cartData = JSON.parse(localCart);
      console.log("Cart data before push --- " + JSON.stringify(cartData));
     // cartData = cartData.filter((item: { id: any; }) => item.id !==  data.id);
      cartData.push(data);
      console.log("Cart data after push --- " + JSON.stringify(cartData));

      localStorage.setItem('localCart', JSON.stringify(cartData));

    }
  }
}

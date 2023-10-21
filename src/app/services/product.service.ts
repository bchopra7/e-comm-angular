import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData = new EventEmitter<product[] | []>();
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
      this.cartData.emit([data]);
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
    this.cartData.emit(cartData);
  }

  removeItemFromCart(productId: number) {
    let localCart = localStorage.getItem('localCart');
    if (localCart) {
      let items: product[] = JSON.parse(localCart);
      items = items.filter((item) => productId !== item.id);
      console.warn("item after clicking remove to cart" + JSON.stringify(items));
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);

    }
  }


  addToCart(cartData: cart) {
    return this.http.post('http://localhost:3000/cart', cartData);

  }
  getCardList(userId: number) {
    return this.http.get<product[]>('http://localhost:3000/cart?userId=' + userId,
      {
        observe: 'response'
      }).subscribe((result) => {
        if(result && result.body){
          console.warn("getCardList - " + JSON.stringify(result))

          this.cartData.emit(result.body);
        }

      });
  }

  removeToCart(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+cartId);

  }
}

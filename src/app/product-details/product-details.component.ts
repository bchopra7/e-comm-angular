import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { cart, product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  constructor(private activateRoute: ActivatedRoute, private product: ProductService) { }
  productData: undefined | product;

  productQuantity: number = 1;
  removeCart = false;
  cartData: product | undefined;
  ngOnInit() {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    console.warn("productId in ProductDetailsComponent - " + productId);
    productId && this.product.getProduct(productId).subscribe((result) => {
      console.warn(" result from productId in ProductDetailsComponent - " + result);
      this.productData = result;


      let cartData = localStorage.getItem('localCart');
      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => productId == item.id.toString());
        if (items.length) {
          this.removeCart = true;
        }
        else { this.removeCart = false; }

      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.product.getCardList(userId);
        this.product.cartData.subscribe((result) => {
          let item = result.filter((item: product) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }
    })
  }
  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val == 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 1 && val == 'min') {
      this.productQuantity -= 1;
    }

  }

  AddToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      console.warn(this.productData);
      if (!localStorage.getItem('user')) {
        console.warn(this.productData);
        this.product.localAddToCart(this.productData);
        this.removeCart = true;

      }
      else {
        console.warn("User is  logged in (AddToCart)")
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        console.warn("logged in User iD  is   (AddToCart)-" + userId);
        let cartData: cart = {
          ...this.productData, userId, productId: this.productData.id
        }
        delete cartData.id;
        console.warn("cartData (AddToCart)-" + JSON.stringify(cartData));
        this.product.addToCart(cartData).subscribe((result) => {
          if (result) {
            alert('Product is added in the cart');
            this.product.getCardList(userId);
            this.removeCart = true;
          }
        })
      }
    }
  }

  removeToCart(productId: number) {

    if (!localStorage.getItem('user')) {
      this.product.removeItemFromCart(productId);
    }
    else {
      if (this.cartData)
        this.product.removeToCart(this.cartData.id).subscribe((result) => {
          console.log("removed cartId -" + this.cartData?.id);
          if (result) {
            let user = localStorage.getItem('user');
              let userId = user && JSON.parse(user).id;
            this.product.getCardList(userId);
          }
        })
    }
    this.removeCart = false;

  }
}

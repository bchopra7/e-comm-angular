import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { PriceSummary, cart } from '../data-type';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  cartData: cart[] | undefined;
  priceSummary: PriceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
  }
  constructor(private route: Router, private product: ProductService) { }

  ngOnInit() {
      this.loadDetails();
  }


  checkout(){
    this.route.navigate(['/checkout']);
  }

  removeToCart(cartId:number|undefined){
    this.cartData &&
    cartId &&
    this.product.removeToCart(cartId).subscribe((result) => {
      console.log("removed cartId -" + cartId);
        this.loadDetails();
    })
  }

  loadDetails(){
    this.product.currentCart().subscribe((result) => {
      console.log("cartData in ngOnInit" + result)
      this.cartData = result;
      let price = 0;
      result.forEach((item) => {
        if(item.quantity)
        price = price + (+item.price*+item.quantity);
      });
      console.log("price-" + price);
        this.priceSummary.price=price;
        this.priceSummary.discount=price/10;
        this.priceSummary.tax=price/10;
        this.priceSummary.delivery=100;
        this.priceSummary.total=price+(price/10)-(price/10)+100;
        if(!this.cartData.length){
            this.route.navigate(['/'])
        }
        console.log(" this.priceSummary-" +  JSON.stringify(this.priceSummary));

    })
  }
}

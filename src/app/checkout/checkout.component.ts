import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { cart, order } from '../data-type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  totalPrice:number|undefined;
  cartData:cart[]|undefined;
  orderMessage:string|undefined;
constructor(private product:ProductService,private router:Router){

}
  ngOnInit() {
    this.product.currentCart().subscribe((result) => {
      console.log("cartData in ngOnInit" + result)
      let price = 0;
      this.cartData=result;
      result.forEach((item) => {
        if(item.quantity)
        price = price + (+item.price*+item.quantity);
      });
        this.totalPrice=price+(price/10)-(price/10)+100;
        console.log("totalPrice in ngOnInit" + this.totalPrice);

    })
  }

  orderNow(data:{email:string,address:string,contact:string}){
    let user=localStorage.getItem('user');
    let userId=user&&JSON.parse(user).id;
    if(this.totalPrice){
      let orderData:order={
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id:undefined
      }
      this.cartData?.forEach((item)=>{

        setTimeout(()=>{
          if(item.id) this.product.deleteCartItems(item.id)
        },800);
      })
      this.product.orderNow(orderData).subscribe((result)=>{
        if(result){
          //alert('Oreder Placed');
          this.orderMessage="Your order has been placed!"

          setTimeout(()=>{
            this.router.navigate(['/my-orders']);
            this.orderMessage=undefined;
          },4000);
        }
      })
    }

    
      console.log("orderNow data-"+JSON.stringify(data));
  }
}

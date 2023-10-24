import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { order } from '../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orderData: order[] | undefined;
  constructor(private product: ProductService, private router: Router) {
  }
  ngOnInit() {
    this.getOrderList();
  }


  cancelOrder(orderId:number|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      this.getOrderList();
    })
  }

  getOrderList(){
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
    })
  }
}

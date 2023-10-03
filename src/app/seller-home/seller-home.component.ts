import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {
  productList: undefined | product[];
  productMessage: undefined | string;
  icon=faTrash;
  editIcon=faEdit;
  constructor(private product: ProductService) { }
  ngOnInit() {
    this.list();
  }

  deleteProduct(id: number) {
    this.product.deleteProducts(id).subscribe((result) => {
      this.productList
      if (result) {
        this.productMessage = "Product is deleted";
        this.list();
      }
    })
    setTimeout(() => this.productMessage = undefined, 3000);
    console.warn("test id" + id);
  }

  //common function to be called from ngoninit and deleteproduct to show updated products
  list() {
    this.product.productList().subscribe((result) => {
      console.warn(result);
      if (result) {
        this.productList = result;
      }
    });
  }
}

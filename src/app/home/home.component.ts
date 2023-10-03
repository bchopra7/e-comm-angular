import { Component } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
	// images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
popularProducts:undefined|product[];
trendyProducts:undefined|product[];
  constructor(private product:ProductService){
  }

  ngOnInit(){
    this.product.popularProducts().subscribe((data)=>{
      console.warn(data);
      this.popularProducts=data;
    });
    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    });
  }
}

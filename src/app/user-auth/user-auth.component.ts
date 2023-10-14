import { Component } from '@angular/core';
import { SignUp, cart, login, product } from '../data-type';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin: boolean = true;
  authError: string = '';

  constructor(private user: UserService, private product: ProductService) { }

  ngOnInit() {
    this.user.userAuthReload();
  }

  signUp(data: SignUp) {
    console.warn("data from form in UserAuthComponent - " + JSON.stringify(data));
    this.user.userSignUp(data);

  }
  login(data: login) {
    console.warn("login data from form in UserAuthComponent - " + JSON.stringify(data));
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      console.warn("invalidUserAuth in login - " + result)
      if (result) {
        this.authError = "Please Enter valid userd details";
      }
      else {
        this.localCartToRemoteCart();
      }
    })

  }
  openSignUp() {
    this.showLogin = false;

  }
  openLogin() {
    this.showLogin = true;
  }
  localCartToRemoteCart() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList = JSON.parse(data);
      cartDataList.forEach((product: product,index: number) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId: userId,
        };
        delete cartData.id;

        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("(localCartToRemoteCart) Added cart to product when user is logged in")
            }
          })

          if(cartDataList.length===index+1){
            localStorage.removeItem('localCart');
          }
        }, 500);
      });
    }

    setTimeout(() => {
      this.product.getCardList(userId);
    }, 2000);
  }
}

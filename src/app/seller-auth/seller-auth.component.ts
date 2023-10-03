import { Component } from '@angular/core';
import { SignUp } from '../data-type';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent {

  constructor(private seller: SellerService, private router: Router) { }
  showLogin = false;
  authError: string = '';

  // signUp(data: SignUp): void {
  //   console.log(data);
  //   this.seller.userSignUp(data).subscribe((result)=>{
  //     if(result){
  //       this.router.navigate(['seller-home']);
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.seller.reloadSeller()
  }
  signUp(data: SignUp): void {
    console.log(data);
    this.seller.userSignUp(data);
  }

  login(data: SignUp): void {
    this.authError = "";

    console.log(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or password incorrect!"
      }
    })
  }


  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }
}

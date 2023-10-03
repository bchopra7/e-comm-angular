import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, login } from '../data-type';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  constructor(private http: HttpClient, private router: Router) { }
  isLoginError = new EventEmitter<boolean>(false);

  // userSignUp(data:SignUp){
  //     return this.http.post('http://localhost:3000/seller',data);
  // }

  userSignUp(data: SignUp) {
    this.http.post('http://localhost:3000/seller', data,
      { observe: 'response' }).subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home']);

        console.warn('result', result);
      });
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data: login) {
    console.warn(data);
    //api call code below

    this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }).subscribe((result: any) => {
        // this.isSellerLoggedIn.next(true);
        // localStorage.setItem('seller', JSON.stringify(result.body))
        // this.router.navigate(['seller-home']);

        console.warn('result', result);
        if (result && result.body && result.body.length) {
          console.warn("user logged in");
          localStorage.setItem('seller', JSON.stringify(result.body))
          this.router.navigate(['seller-home']);
        }
        else {
          console.warn("loggin failed");
          this.isLoginError.emit(true);
        }

      });
  }
}

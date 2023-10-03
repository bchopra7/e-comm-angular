import { Component } from '@angular/core';
import { SignUp, login } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {
  showLogin: boolean = true;
  authError:string='';

  constructor(private user: UserService) { }

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
    this.user.invalidUserAuth.subscribe((result)=>{
      console.warn("invalidUserAuth in login - "+result)
      if(result){
        this.authError="Please Enter valid userd details";
      }
    })

  }
  openSignUp() {
    this.showLogin = false;

  }
  openLogin() {
    this.showLogin = true;
  }
}

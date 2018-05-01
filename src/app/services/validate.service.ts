import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class ValidateService {
  res: Boolean;
  res2: Boolean;

  constructor(private auth:AuthService) { }

  validateRegister(user){
    if(user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined || user.name == "" || user.email == "" || user.username == "" || user.password == ""){
      return false;
    }
    else {
      return true;
    }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateExistingUsername(username){
    this.auth.validateCredential('username',username).subscribe(
      data => {
        console.log('Username existing: '+data.existing);
        this.res2 = !data.existing;
      },
      err => console.error(err),
      () => {
        console.log("res : "+this.res);
        return this.res;
      });
  }

  validateExistingEmail(email:String){
    this.auth.validateCredential('email',email).subscribe(
      data => {
        console.log('mail existing : '+data.existing);
        this.res = !data.existing;
    },
    err => console.error(err),
    () => {
      console.log("res : "+this.res);
      return this.res;
    });
    
  }
}

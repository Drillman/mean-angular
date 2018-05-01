import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService, 
    private flashMessages: FlashMessagesService, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessages.show('Please fill in all fields', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessages.show('Please enter a valid email', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

        // Cheking if the username is already in the database
        if(!this.validateService.validateExistingUsername(user.username)){
          this.flashMessages.show('This username is already used', {cssClass: 'alert-danger', timeout:3000});
          return false;
        }

    // Checking if the email is already in the database
    if(!this.validateService.validateExistingEmail(user.email)){
      this.flashMessages.show('This mail address is already used', {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    //Register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessages.show('You are now resgistered and can log in', {cssClass: "alert-success", timeout:3000}); 
        this.router.navigate(['/dashboard']);
      }
      else{
        this.flashMessages.show('Something went wrong', {cssClass: "alert-danger", timeout:3000}); 
        this.router.navigate(['/register']);
      }
    });
  }

}

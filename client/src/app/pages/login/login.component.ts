import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(){}
  // *****************************************************************
  auth=inject(AuthenticationService);
  formGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })
  data = null;
  // ****************************************************************
  submit() {
    this.auth.login(this.formGroup.value).subscribe(data => {
      console.log(data);
    })
  }

}

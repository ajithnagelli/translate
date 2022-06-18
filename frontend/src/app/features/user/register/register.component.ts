import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error: any;
  email: any;
  username: any;
  password: any;
  reenterPassword: any;

  constructor(public router: Router, public userService: UserService, public toastrService: ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.router.navigateByUrl('/translate');
    }
  }

  goToLogin() {
    this.router.navigateByUrl("user/login");
  }

  validCredentials() {
    if(this.username == undefined || this.username.length == 0) {
      this.error = 'Enter valid username';
    }
    else if(!RegExp(/^(([_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-z0-9-]([\w\-])+(\.[a-z0-9-]+)*(\.[a-z]{2,6})))+$/).test(this.email)) {
      this.error = 'Enter valid email address';
    }
    else if(this.password.length <= 8) {
      this.error = 'Password length should be greater than 8';
    }
    else if(this.password !== this.reenterPassword) {
      this.error = 'Password Mismatch';
    }
    else {
      this.error = ''
    }
    return (RegExp(/^(([_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-z0-9-]([\w\-])+(\.[a-z0-9-]+)*(\.[a-z]{2,6})))+$/).test(this.email) && 
      this.password.length > 8 && this.password === this.reenterPassword && this.username.length > 0);
  }

  register() {
    const data = {
      email: this.email,
      username: this.username,
      hashedPassword: this.password
    }
    this.userService.register(data).subscribe({
      next: (res) => {
        this.toastrService.success('User Registered Successfully', '', {
          timeOut: 2000,
        });
        localStorage.setItem('token', res["token"]);
        this.router.navigateByUrl('/translate');
      },
      error: (err) => {
        this.toastrService.error(err.error.status, '', {
          timeOut: 2000,
        });
      }
    });
  }
}

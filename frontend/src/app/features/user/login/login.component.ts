import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: any;
  email: any;
  password: any;
  constructor(public router: Router, public userService: UserService, public toastrService: ToastrService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')) {
      this.router.navigateByUrl('/translate');
    }
  }

  goToSignup() {
    this.router.navigateByUrl("user/register");
  }

  login() {
    const data = {
      email: this.email,
      hashedPassword: this.password
    }
    this.userService.login(data).subscribe({
      next: (res) => {
        this.toastrService.success('Logged In Successfully', '', {
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

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  constructor(public router: Router, public toastrService: ToastrService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('token')) {
      this.router.navigateByUrl('/user/login');
    }
    else {
      this.router.navigateByUrl('/translate');
    }
  }

  isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/user/login');
    this.toastrService.success('Logged Out Successfully', '', {
      timeOut: 2000,
    });
  }
}

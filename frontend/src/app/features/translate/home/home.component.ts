import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from 'src/app/services/translate.service';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataSource: any;
  displayedColumns: any;
  constructor(public router: Router, public translateService: TranslateService, public toastrService: ToastrService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('token')) {
      this.router.navigateByUrl('/user/login');
    }
  }

  translate() {
    this.translateService.translateData().subscribe({
      next: (res) => {
        if(res) {
          console.log(res);
          this.toastrService.success(res.status, '', {
            timeOut: 2000,
          });
        }
      }, 
      error: (err) => {
        this.toastrService.error(err.error.status, '', {
          timeOut: 2000,
        });
      }
    });
  }

  getData() {
    this.translateService.gettTranslatedData().subscribe({
      next: (res) => {
        this.dataSource = res;
        this.displayedColumns = Object.keys(this.dataSource[0].translatedData[0]);
      }, 
      error: (err) => {
        this.toastrService.error(err.error.status, '', {
          timeOut: 2000,
        });
      }
    });
  }

}

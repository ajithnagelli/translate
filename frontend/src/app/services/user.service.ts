import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(data: any) {
    return this.http.post<any>(environment.server + 'user/register', data);
  }

  login(data: any) {
    return this.http.post<any>(environment.server + 'user/login', data);
  }
}

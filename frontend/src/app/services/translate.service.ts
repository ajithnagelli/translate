import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient) { }

  translateData() {
      return this.http.post<any>(environment.server + 'translate/translateData', '');
  }

  gettTranslatedData() {
    return this.http.get<any>(environment.server + 'translate/translatedData');
  }
}

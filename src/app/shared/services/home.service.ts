import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from 'src/assets/config/apiConfig';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiConfig = ApiConfig;
  constructor(private http: HttpClient) { }

  public getJwtToken() {
    return this.http.get(this.apiConfig.url).pipe( map (res => res));
    }
  }


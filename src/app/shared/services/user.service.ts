import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '../../../assets/config/apiConfig';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  apiConfig = ApiConfig;

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError(error);
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  public getUserList(searchText): Observable<any> {
    const params = new HttpParams().set('searchText', searchText);
    return this.http.get(this.apiConfig.url + `user/${searchText}`).pipe(
       map(this.extractData),
      catchError(this.handleError)
    );
  }

  public getAllUsers() {
    return this.http.get(this.apiConfig.url + 'users').pipe(
      map(this.extractData),
     catchError(this.handleError)
   );
  }
}

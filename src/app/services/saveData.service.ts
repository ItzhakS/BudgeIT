import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveDataService {

  mongoDBUrl = 'http://localhost:4000/server/api/months'

  constructor(private http: HttpClient) { }

  saveMonthsBudget(budgetData:object, fromIncome:boolean): Observable<object>{
    console.log('Reached Service');
    if(fromIncome) return this.http.post<object>(this.mongoDBUrl+'/income', budgetData);
    else return this.http.post<object>(this.mongoDBUrl+'/expenses', budgetData); 
      // .pipe(this.handleError(Error))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { IEmployee } from '../interfaces/IEmployee';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeService {
  baseUrl: string = 'http://localhost:3000/employess';
  constructor(private httpClient: HttpClient) {}

  get = (): Observable<IEmployee[]> => {
    return this.httpClient
      .get<IEmployee[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  };

  getEmployee = (id: number): Observable<IEmployee> => {
    return this.httpClient
      .get<IEmployee>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  };

  update = (employee: IEmployee) => {
    return this.httpClient
      .put<void>(`${this.baseUrl}/${employee.id}`, employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  };

  delete = (id: number) => {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  };

  create = (employee: IEmployee) => {
    return this.httpClient
      .post<IEmployee>(this.baseUrl, employee, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(this.handleError));
  };

  handleError = (err: HttpErrorResponse) =>
    throwError('Problem with the service');
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<string>('John');
  cast = this.user.asObservable();
  constructor() {}
}

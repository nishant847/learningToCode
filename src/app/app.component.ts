import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'my-ng-angular-app';
  color: string = 'red';

  constructor(private httpClient: HttpClient) {

    
  }
}

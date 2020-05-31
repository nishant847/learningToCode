import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
<<<<<<< HEAD
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'my-ng-angular-app';
  color: string = 'red';
  name: string = '';
  age: number = 0;
  id: number = 0;
  found: boolean = false;

  constructor(private httpClient: HttpClient) {}

<<<<<<< HEAD
    
  }
=======
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'my-ng-angular-app';
>>>>>>> Revert "Revert "initial commit""
=======
  OnNameKeyUp = (event: any) => {
    this.id = event.target.value;
  };

  getProfile = () => {
    this.httpClient
      .get(
        `https://my-json-server.typicode.com/typicode/demo/posts?id=${this.id}`
      )
      .subscribe((data: any[]) => {
        if (data.length) {
          this.title = data[0].title;
          this.found = true;
        }
      });
  };
>>>>>>> local commit
}

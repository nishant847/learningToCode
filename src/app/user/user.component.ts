import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
})
export class UserComponent implements OnInit {
  name: string = '';
  sub: any = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.name = params.name;
    });
  }
}

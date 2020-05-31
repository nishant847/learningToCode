import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.less'],
})
export class NamesComponent implements OnInit {
  nameList: string[] = ['Shray', 'Nisgnat', 'Ruuu'];
  name: string = '';
  constructor() {}

  ngOnInit(): void {}

  eventFromInner = (passed: string) => {
    this.name = passed;
  };
}

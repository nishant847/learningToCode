import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-name-tag',
  templateUrl: './name-tag.component.html',
  styleUrls: ['./name-tag.component.less'],
})
export class NameTagComponent implements OnInit {
  @Input() name: string;
  @Output() eventFromInner1 = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  sendToOuter = () => {
    this.eventFromInner1.emit(this.name);
  };
}

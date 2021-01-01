import { Component, OnInit } from '@angular/core';

declare const window: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
    window.FB?.XFBML?.parse();
  }
}

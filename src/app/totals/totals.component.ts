import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent implements OnInit {

  @Input() totalIncome: Object;
  @Input() totalExpenses: Object;


  constructor() { }

  ngOnInit() {
  }
  

}

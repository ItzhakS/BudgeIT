import { Component, OnInit } from '@angular/core';
import { DisplayDataService } from '../services/display-data.service';

@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.css']
})
export class MonthsComponent implements OnInit {

  monthList = ["January","February","March","April","May","June","July","August","September","October","November","Decemeber"];
  constructor(private displayData: DisplayDataService) { }

  ngOnInit() {
  }

  changeMonth(){
    this.displayData.updateMonth('October');
  }

}

import { Component, OnInit, Input, SimpleChanges, OnChanges, SimpleChange, ViewChild } from '@angular/core';
import { DisplayDataService } from '../services/display-data.service';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent implements OnChanges, OnInit {

  @Input() incomeArray: Object;
  @Input() expenseArray: Object;
  incomeTotal: number = 0;
  expenseTotal: number = 0;
  globalTotal: number;
  @ViewChild('incomeProgressBar') incomeProgressBar;
  @ViewChild('expenseProgressBar') expenseProgressBar;
  

  constructor(private displayData: DisplayDataService) {
    
  }
  
  ngOnChanges(changes: SimpleChanges) {
    // let incomeInfo: SimpleChange = changes.incomeArray;
    // let expensesInfo: SimpleChange = changes.incomeArray;
    // // this.incomeTotal = incomeInfo.currentValue.incomeAmounts.reduce((a,b)=>a+b);
    // console.log(incomeInfo);
    // // console.log(expensesInfo);
  }
  
  ngOnInit() {
    this.displayData.currentIncome
    .subscribe(incomeData => {
      this.incomeArray = incomeData;
      console.log('Updateing inceome');
      if(this.incomeArray['amounts']){
        this.addAndDisplayTotal(true);
        if(this.expenseArray['amounts']) this.addAndDisplayTotal(false);
      }

    });
    this.displayData.currentExpenses
    .subscribe(expenseData => {
      this.expenseArray = expenseData;
      // console.log(incomeData);
      if(this.expenseArray['amounts']){
        this.addAndDisplayTotal(false);
        if(this.incomeArray['amounts']) this.addAndDisplayTotal(true);
        }

    });
    // console.log(this.incomeProgressBar);
  }

  addAndDisplayTotal(fromIncome): any {
    if(fromIncome){
      this.incomeTotal = this.incomeArray['amounts'].reduce((a,b)=>a+b) | 0;
      this.globalTotal = this.incomeTotal + this.expenseTotal;
      let incomePercent = (this.incomeTotal*100)/this.globalTotal;
      console.log(incomePercent);
      this.incomeProgressBar.nativeElement.attributes[1].value = this.globalTotal;
      this.incomeProgressBar.nativeElement.attributes[3].value = this.incomeTotal;
      this.incomeProgressBar.nativeElement.style.width = `${incomePercent}%`;
    } else{
      this.expenseTotal= this.expenseArray['amounts'].reduce((a,b)=>a+b) | 0;
      this.globalTotal = this.expenseTotal + this.incomeTotal;
      let expensePercent = (this.expenseTotal*100)/this.globalTotal;
      console.log(expensePercent);
      this.expenseProgressBar.nativeElement.attributes[1].value = this.globalTotal;
      this.expenseProgressBar.nativeElement.attributes[3].value = this.expenseTotal;
      this.expenseProgressBar.nativeElement.style.width = `${expensePercent}%`;
    }
  }

 


}

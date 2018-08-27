import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BudgeIT';
  incomeAmounts = [];

  recieveIncome($event){
    this.incomeAmounts=[];
    $event.forEach(income => {
      this.incomeAmounts.push(income.value);
    });
    console.log(this.incomeAmounts);
    console.log($event);
  }
}

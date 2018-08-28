import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BudgeIT';
  incomeAmounts: Array<number>;
  incomeSources: Array<string>;
  expenseAmounts: Array<number>;
  expenseSources: Array<string>;

  recieveIncome($event){
    this.incomeAmounts=[];
    this.incomeSources=[];
    $event.forEach(income => {
      if(typeof income.value == 'number' )
        this.incomeAmounts.push(income.value);
      else
        this.incomeSources.push(income.value);
    });
  }

  recieveExpenses($event){
    this.expenseAmounts=[];
    this.expenseSources=[];
    $event.forEach(expense => {
      if(typeof expense.value == 'number' )
        this.expenseAmounts.push(expense.value);
      else
        this.expenseSources.push(expense.value);
    });
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BudgeIT';
  incomeObj: Object = {};
  expenseObj: Object = {};
  incomeAmounts: Array<number>;
  incomeSources: Array<string>;
  expenseAmounts: Array<number>;
  expenseSources: Array<string>;

  recieveIncome($event){
    if(typeof $event[0].value == 'number' ){
      this.incomeAmounts=[];
      $event.forEach(income => {
        this.incomeAmounts.push(income.value);
      });
      } else{
        this.incomeSources=[];
        $event.forEach(income => {
          this.incomeSources.push(income.value);
        });
      }
    this.incomeObj['incomeAmounts'] = this.incomeAmounts;
    this.incomeObj['incomeSources'] = this.incomeSources;
  }

  recieveExpenses($event){
    $event.forEach(expense => {
      if(typeof expense.value == 'number' ){
        this.expenseAmounts=[];
        this.expenseAmounts.push(expense.value);
      }
      else{
        this.expenseSources=[];
        this.expenseSources.push(expense.value);
      }
    });
    
    this.expenseObj['expenseAmounts'] = this.expenseAmounts;
    this.expenseObj['expenseSources'] = this.expenseSources;
  }


}

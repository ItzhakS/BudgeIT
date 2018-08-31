import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DisplayDataService {

  private incomeData = new BehaviorSubject<object>({});
  currentIncome = this.incomeData.asObservable();
  private expenseData = new BehaviorSubject<object>({});
  currentExpenses = this.expenseData.asObservable();


  constructor() { }

  updateIncome(data:object){
    this.incomeData.next(data);
  }

  updateExpenses(data:object){
    this.expenseData.next(data);
  }

}

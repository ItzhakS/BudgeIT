import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { DisplayDataService } from '../services/display-data.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  // expenseForm = new FormGroup({
  //   cause: new FormControl(''),
  //   amount: new FormControl(''),
  // });

  expenseForm = this.fb.group({
    expenseSources : this.fb.array([
      this.fb.control(''),
      this.fb.control(''),
      this.fb.control('')
    ]),
    expenseAmounts: this.fb.array([
      this.fb.control(''),
      this.fb.control(''),
      this.fb.control('')
    ])
  });

  get expenseSources() {
    return this.expenseForm.get('expenseSources') as FormArray;
  }
  get expenseAmounts() {
    return this.expenseForm.get('expenseAmounts') as FormArray;
  }

  @Output() inputEvent = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private displayData: DisplayDataService) { }

  ngOnInit() {
  }

  addExpense() {
    this.expenseSources.push(this.fb.control(''));
    this.expenseAmounts.push(this.fb.control(''));
  }

  sendAmountInput(){
    let expenseObj = {'amounts':[]}
    this.expenseAmounts.controls.forEach(control=>{
      if(control.value == '') return;
      expenseObj.amounts.push(control.value)
      // console.log(control.value);
    })

    this.displayData.updateExpenses(expenseObj);

    // this.inputEvent.emit(this.expenseAmounts.controls)
  }
  sendSourceInput(){
    this.inputEvent.emit(this.expenseSources.controls)
  }
}

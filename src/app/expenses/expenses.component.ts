import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

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
      this.fb.control('')
    ]),
    expenseAmounts: this.fb.array([
      this.fb.control('')
    ])
  });

  get expenseSources() {
    return this.expenseForm.get('expenseSources') as FormArray;
  }
  get expenseAmounts() {
    return this.expenseForm.get('expenseAmounts') as FormArray;
  }


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  addExpense() {
    this.expenseSources.push(this.fb.control(''));
    this.expenseAmounts.push(this.fb.control(''));
  }

}

import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { DisplayDataService } from '../services/display-data.service';
import { SaveDataService } from '../services/saveData.service';

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

  @Input() month:string;

  // @Output() inputEvent = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private displayData: DisplayDataService, private saveData: SaveDataService) { }

  ngOnInit() {
    this.displayData.currentMonth
      .subscribe(month=>{
        this.month = month;
        console.log(month);
      })

  }

  onSubmit(){
    console.log('Submitting');
    let expenseObj = {"month":this.month, "expenses":{'expenseSources':[],'expenseAmounts':[]}}
    this.expenseSources.controls.forEach(control=>{
      if(control.value == '') return;
      expenseObj.expenses.expenseSources.push(control.value)
      // console.log(control.value);
    })
    this.expenseAmounts.controls.forEach(control=>{
      if(control.value == '') return;
      expenseObj.expenses.expenseAmounts.push(control.value)
      // console.log(control.value);
    })
    this.saveData.saveMonthsBudget(expenseObj, false)
      .subscribe(data => {
        this.clearControls();
        console.log(data)
      });
    // console.warn(this.expenseForm.value);
  }
  clearControls(): any {
    this.expenseSources.controls.forEach((control)=>{control.reset;control.setValue('');});
    this.expenseAmounts.controls.forEach((control)=>{control.reset;control.setValue('');});
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
  // sendSourceInput(){
  //   this.inputEvent.emit(this.expenseSources.controls)
  // }
}

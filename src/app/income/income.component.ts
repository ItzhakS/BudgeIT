import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Validators, FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DisplayDataService } from '../services/display-data.service';
import { SaveDataService } from '../services/saveData.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  // incomeForm = new FormGroup({
  //   source: new FormControl(''),
  //   amount: new FormControl(''),
  // });

  incomeForm = this.fb.group({
    incomeSources : this.fb.array([
      this.fb.control(''),
      this.fb.control(''),
      this.fb.control('')
    ]),
    incomeAmounts: this.fb.array([
      this.fb.control(''),
      this.fb.control(''),
      this.fb.control('')
    ])
  });
  @Input() month: any;

  get incomeSources() {
    return this.incomeForm.get('incomeSources') as FormArray;
  }
  get incomeAmounts() {
    return this.incomeForm.get('incomeAmounts') as FormArray;
  }

  @Output() inputEvent = new EventEmitter<any>();


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
    let incomeObj = {"month":this.month, "income":{'incomeSources':[],'incomeAmounts':[]}}
    this.incomeSources.controls.forEach(control=>{
      if(control.value == '') return;
      incomeObj.income.incomeSources.push(control.value)
      // console.log(control.value);
    })
    this.incomeAmounts.controls.forEach(control=>{
      if(control.value == '') return;
      incomeObj.income.incomeAmounts.push(control.value)
      // console.log(control.value);
    })
    this.saveData.saveMonthsBudget(incomeObj, true)
      .subscribe(data => {
        this.clearControls();
        console.log(data)
      });
    // console.warn(this.incomeForm.value);
  }
  clearControls(): any {
    this.incomeSources.controls.forEach((control)=>{control.reset;control.setValue('');});
    this.incomeAmounts.controls.forEach((control)=>{control.reset;control.setValue('');});
  }

  addIncome() {
    this.incomeSources.push(this.fb.control(''));
    this.incomeAmounts.push(this.fb.control(''));
  }

  sendAmountInput(){
    let incomeObj = {'amounts':[]}
    this.incomeAmounts.controls.forEach(control=>{
      if(control.value == '') return;
      incomeObj.amounts.push(control.value)
      // console.log(control.value);
    })

    this.displayData.updateIncome(incomeObj);

    // this.inputEvent.emit(this.incomeAmounts.controls)
  }
  sendSourceInput(){
    this.inputEvent.emit(this.incomeSources.controls)
  }

}

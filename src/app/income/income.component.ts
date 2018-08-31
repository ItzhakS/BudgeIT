import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Validators, FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DisplayDataService } from '../services/display-data.service';

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

  get incomeSources() {
    return this.incomeForm.get('incomeSources') as FormArray;
  }
  get incomeAmounts() {
    return this.incomeForm.get('incomeAmounts') as FormArray;
  }

  @Output() inputEvent = new EventEmitter<any>();


  constructor(private fb: FormBuilder, private displayData: DisplayDataService) { }

  ngOnInit() {
  }

  onSubmit(){
    console.warn(this.incomeForm.value);
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

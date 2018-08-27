import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Validators, FormArray, FormControl, FormGroup, FormBuilder } from '@angular/forms';

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
      this.fb.control('')
    ]),
    incomeAmounts: this.fb.array([
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


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(){
    console.warn(this.incomeForm.value);
  }

  addIncome() {
    this.incomeSources.push(this.fb.control(''));
    this.incomeAmounts.push(this.fb.control(''));
  }

  sendInput(){
    this.inputEvent.emit(this.incomeAmounts.controls)
  }

}

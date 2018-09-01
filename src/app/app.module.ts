import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { IncomeComponent } from './income/income.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { TotalsComponent } from './totals/totals.component';
import { HeaderComponent } from './header/header.component';
import { DisplayDataService } from './services/display-data.service';
import { SaveDataService } from './services/saveData.service';

@NgModule({
  declarations: [
    AppComponent,
    IncomeComponent,
    ExpensesComponent,
    TotalsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    DisplayDataService,
    SaveDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

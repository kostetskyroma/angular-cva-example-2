import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainFormComponent } from './main-form/main-form.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { AddressInfoComponent } from './address-info/address-info.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainFormComponent,
    BasicInfoComponent,
    AddressInfoComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

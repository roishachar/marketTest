import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BackOfficeComponent } from './backoffice/backoffice.component';
import { DataService } from './services/data.service';

import { ToastComponent } from './shared/toast/toast.component';

const routing = RouterModule.forRoot([
    { path: '',      component: HomeComponent },
    { path: 'backoffice', component: BackOfficeComponent }
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BackOfficeComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    DataService,
    ToastComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})

export class AppModule { }

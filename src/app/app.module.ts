import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { SlowDirective } from './slow.directive';
import { FastDirective } from './fast.directive';
import { ConnectionDirective } from './connection.directive';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    SlowDirective,
    FastDirective,
    ConnectionDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

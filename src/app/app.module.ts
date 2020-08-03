import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { SlowDirective } from './slow.directive';
import { FastDirective } from './fast.directive';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    SlowDirective,
    FastDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

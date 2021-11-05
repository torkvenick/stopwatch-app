import { StorageService } from './../services/storage.service';
import { ControlService } from './../services/control.service';
import { ButtonService } from './../services/buttons.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [ButtonService,
              ControlService,
              StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

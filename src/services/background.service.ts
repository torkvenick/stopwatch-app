import { StorageService } from './storage.service';
import { Actions, State } from './../app/state.model';
import { ControlService } from './control.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BackgroundService {
  State?: State;

  storeState(state: State) {
    this.State = state;
    this.storageService.toStorage(this.State);
  }

  constructor(private controlService: ControlService,
    private storageService: StorageService) {
    this.State = this.storageService.toData();
    if (this.State === State.isRunning) {
      console.log('the status is: ' + this.State);
      //this.controlService.switchAction(this.actionStatus);
    } 
  }
}
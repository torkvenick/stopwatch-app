import { ControlService } from './../services/control.service';
import { BackgroundService } from './../services/background.service';
import { ButtonService } from './../services/buttons.service';
import { Actions, State } from './state.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //#region variables
  State = State;
  Actions = Actions;

  get seconds () {
    return this.controlService.passSeconds();
  }
  get time () {
    return this.controlService.time();
  }
  
  get laps () {
    return this.controlService.passLaps();
  }

  get state() {
    return this.controlService.passState();
  }

  btnTitle (action: Actions) {
    return this.buttonService.buttonTitles(action);
  } 
  //#endregion
  
  //#region lifecycle hooks
  constructor(private buttonService: ButtonService,
              private controlService: ControlService,
              private backgroundService: BackgroundService) {}
  //#endregion
              
  //#region functions  
  switchAction(action: Actions) {
    /* if(action === 1) {
      let currentTime = new Date();
      let testTime = currentTime.toLocaleTimeString();
      console.log(testTime);
    }  */
    return this.controlService.switchAction(action);
  }
  storeState(state: State) {
    console.log(state);
    this.backgroundService.storeState(state);
  }
 
  addLap() {
    return this.controlService.addLap();
  }

  displayLap(lap:number) {
    return this.controlService.secondsToDisplayedTime(lap);
  }
  //#endregion
}
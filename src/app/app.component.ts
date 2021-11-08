import { ControlService } from './../services/control.service';
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

  get seconds() {
    return this.controlService.passSeconds();
  }
  get time() {
    return this.controlService.time();
  }

  get localTime() {
    return new Date().getTime();
  }

  get laps() {
    return this.controlService.passLaps();
  }

  get state() {
    return this.controlService.passState();
  }

  btnTitle(action: Actions) {
    return this.buttonService.buttonTitles(action);
  }
  //#endregion

  //#region lifecycle hooks
  constructor(private buttonService: ButtonService,
    private controlService: ControlService) { }
  //#endregion

  //#region functions  
  switchAction(action: Actions,localTime: number) {
    this.controlService.switchAction(action, localTime);
  }

  addLap() {
    return this.controlService.addLap();
  }

  displayLap(lap: number) {
    return this.controlService.secondsToDisplayedTime(lap);
  }
  //#endregion
}
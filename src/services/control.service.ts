import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Actions, State } from './../app/state.model';


@Injectable()
export class ControlService {


  private intervalRef: any;
  private state: State = State.isStopped;
  private pauseTime: number = this.storageService.pauseTimeToData();

  private timeRef!: number;

  private laps: number[] = [];

  time() {
    return this.secondsToDisplayedTime(this.timeRef);
  }

  passSeconds() {
    return this.timeRef;
  }
  passLaps() {
    return this.laps;
  }
  passState() {
    return this.state;
  }

  constructor(private storageService: StorageService) {

    const storedState: State = this.storageService.stateToData();
    const storedLaps: number[] = this.storageService.lapsToData();
    this.laps = storedLaps;
    if (storedState === State.isRunning) {
      this.state = State.isRunning;
      const startLocalTime = this.storageService.timeToData() - this.pauseTime * 1000;
      const currentLocalTime = new Date().getTime();
      this.timeRef = (currentLocalTime - startLocalTime) / 1000;
      this.onStartCounter();
      
    } else if (storedState === State.isPaused) {
      this.timeRef = this.pauseTime;
      this.state = State.isPaused;
      
    } else {
      this.timeRef = 0;
      return;
    }
  }

  // PRETIFY DISPLAYED TIME
  secondsToDisplayedTime(seconds: number) {
    const displayedHours = this.addLeadingZero(Math.floor(seconds / 3600));
    const displayedMinutes = this.addLeadingZero(Math.floor(seconds / 60 % 60));
    const displayedSeconds = this.addLeadingZero((Math.floor(seconds % 60 * 100) / 100),2);
    const time = displayedHours + ':' + displayedMinutes + ':' + displayedSeconds;
    return time;
  }

  addLeadingZero(timeValue: number, fixedDecimal: number = 0) {
    if (timeValue < 10) {
      return '0' + timeValue.toFixed(fixedDecimal);
    } else {
      return timeValue.toFixed(fixedDecimal);
    }
  }

  // COUNTER CONTROLS
  onStartCounter() {
    if (this.intervalRef) {
      return;
    }
    this.pauseTime = this.storageService.pauseTimeToData();
    //this.timeRef = this.storageService.timeToData() - this.pauseTime * 1000;
    const startLocalTime = this.storageService.timeToData() - this.pauseTime * 1000;
    this.intervalRef = setInterval(() => {
      const currentLocalTime = new Date().getTime();
      return this.timeRef = (currentLocalTime - startLocalTime) / 1000;
    }, 10);
  }
  onPauseCounter() {
    clearInterval(this.intervalRef);
    this.intervalRef = undefined;
  }

  // BUTTONS SWITCH CONTROLS
  switchAction(action: Actions, state: State, localTime: number) {
    //do switch (best with default)
    this.storeState(state);
    switch (action) {
      case Actions.start:
        this.storageService.clearStorage();
        this.state = State.isRunning;
        this.storeLocalTime(localTime);
        this.onStartCounter();
        this.laps = [];
        break;
      case Actions.pause:
        this.state = State.isPaused;
        this.storePauseTime(this.timeRef);
        this.onPauseCounter();
        break;
      case Actions.resume:
        this.state = State.isRunning;
        this.storeLocalTime(localTime);
        this.onStartCounter();
        break;
      case Actions.stop:
        this.state = State.isStopped;
        this.timeRef = 0;
        this.onPauseCounter();
        break;
      default:
        this.state = State.isStopped;
        this.timeRef = 0;
        this.laps = [];
        break;
    }
  }
  // ADD LAPS
  addLap() {
    if (this.laps.length < 1) {
      const newLap = this.laps.push(this.timeRef);
      this.storeLaps(this.laps);
      return newLap;
    }
    const sumOfLaps = (previousValue: number, currentValue: number) => previousValue + currentValue;
    const currentLap = this.timeRef - this.laps.reduce(sumOfLaps);
    const newLap = this.laps.push(currentLap);
    this.storeLaps(this.laps);
    return newLap;
  }

  // STORE STATES
  storeState(state: State) {
    this.storageService.stateToStorage(state);
  }
  storeLocalTime(localTime: number) {
    this.storageService.timeToStorage(localTime);
  }
  storePauseTime(pauseTime: number) {
    this.storageService.pauseTimeToStorage(pauseTime);
  }
  storeLaps(laps: number[]) {
    this.storageService.lapsToStorage(laps);
  }
}
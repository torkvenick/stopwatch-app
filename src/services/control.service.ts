import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Actions, State } from './../app/state.model';


@Injectable()
export class ControlService {

  private timeRef: number = 0;
  // timRef gets the moment of the start of my stopwatch. I need to convert this time into seconds. I need to create a method which converts time to seconds since the time is passed to other methods or whatever...
  // 
  private intervalRef: any;
  private state: State = State.isStopped;


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
      const currentLocalTime: number = new Date().getTime();
      const storedLocalTime: number = this.storageService.timeToData();
      const pauseLocalTime: number = this.storageService.pauseTimeToData();
      const neededTime = (currentLocalTime - storedLocalTime) / 1000 + pauseLocalTime;
      this.timeRef = neededTime;
      this.state = State.isRunning;
      this.onStartCounter();
    } else if (storedState === State.isPaused) {
      this.timeRef = this.storageService.pauseTimeToData();
      this.state = State.isPaused;
    } else {
      return;
    }
  }

  // PRETIFY DISPLAYED TIME
  secondsToDisplayedTime(seconds: number) {
    const displayedHours = this.addLeadingZero(Math.floor(seconds / 3600));
    const displayedMinutes = this.addLeadingZero(Math.floor(seconds / 60 % 60));
    const displayedSeconds = this.addLeadingZero(Math.floor(seconds % 60));
    const time = displayedHours + ':' + displayedMinutes + ':' + displayedSeconds;
    return time;
  }

  addLeadingZero(timeValue: number) {
    if (timeValue < 10) {
      return '0' + timeValue;
    } else {
      return timeValue.toString();
    }
  }

  startLocalTime!: number;
  // COUNTER CONTROLS
  onStartCounter() {
    if (this.intervalRef) {
      return;
    }  
      this.startLocalTime = new Date().getTime();
    this.intervalRef = setInterval(() => {
      const currentLocalTime = new Date().getTime();
      return this.timeRef = Math.floor((currentLocalTime - this.startLocalTime) / 1000);
    }, 1000);
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
        this.onStartCounter();
        this.state = State.isRunning;
        this.storeLocalTime(localTime);
        this.laps = [];
        break;
      case Actions.pause:
        this.state = State.isPaused;
        this.onPauseCounter();
        this.storePauseTime(this.timeRef);
        break;
      case Actions.resume:
        this.state = State.isRunning;
        this.onStartCounter();
        this.storeLocalTime(localTime);
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
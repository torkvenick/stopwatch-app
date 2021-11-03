import { State, Actions } from './state.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //#region variables
  Actions = Actions;
  State = State;
  state: State = State.isStopped;
  
  time = '00:00:00';
  seconds: number = 0;
  intervalRef: any;
  
  laps: number[] = [];
  userLaps: string[] = [];

  get minutes() {
    return this.checkTime(Math.floor(this.seconds / 60 % 60));
  }
  get hours() {
    return this.checkTime(Math.floor(this.seconds / 3600));
  }
  //#endregion
  
  //#region lifecycle hooks
  constructor() { }
  //#endregion
  
  //#region functions
  checkTime(timeValue: number) {
    if (timeValue < 10) {
      return '0' + timeValue;
    } else {
      return timeValue;
    }
  }
  
  setCounter = () => {
    this.seconds++;
    const convertedSeconds = this.stopRaising(this.seconds);
    const displayedSeconds = this.checkTime(convertedSeconds);

    this.time = this.hours + ':' + this.minutes + ':' + displayedSeconds;
  }

  stopRaising(timeValue: number) {
    return timeValue % 60;
  }

  onStartCounter() {
    if (this.intervalRef) {
      return;
    }
    this.intervalRef = setInterval(this.setCounter, 0);
  }

  onPauseCounter() {
    clearInterval(this.intervalRef);
    this.intervalRef = undefined;
  }

  switchAction(action: Actions) {
    if(action === Actions.start) {
      this.state = this.State.isRunning;
      this.onStartCounter();
      this.laps = [];
      this.userLaps = [];
    }
    if (action === Actions.pause) {
      this.state = this.State.isPaused;
      this.onPauseCounter();
    }
    if(action === Actions.resume) {
      this.state = this.State.isRunning;
      this.onStartCounter();
    }
    if(action === Actions.stop) {
      this.state = this.State.isStopped;
      this.seconds = 0;
      this.time = '00:00:00';
      this.onPauseCounter();
    }
  }

  userTime = (currentLap: number, lastLap: number) => {
    let lapHours = this.checkTime(Math.floor(currentLap / 3600));
    let lapMinutes = this.checkTime(Math.floor(currentLap / 60 % 60));

    let convertedLap = this.stopRaising(lastLap);
    let displayedLap = this.checkTime(convertedLap);

    let displayedTime = lapHours + ':' + lapMinutes + ':' + displayedLap;
    return displayedTime;
  }

  lapSnap() {
    if (this.laps.length < 1) {
      this.laps.push(this.seconds);
      this.userLaps.push(this.userTime(this.seconds, this.seconds));
      return;
    } 
      let sumOfLaps = (previousValue: number, currentValue: number) => previousValue + currentValue;
      let currentLap = this.seconds - this.laps.reduce(sumOfLaps);
      this.laps.push(currentLap);

      let lastLap = this.laps[this.laps.length - 1];
      this.userLaps.push(this.userTime(currentLap,lastLap));
  }
  //#endregion
}

  //timer
  /* public displayTimer: any;
  public isRunning: boolean = false;
  public startText = 'Start';
  public time: any;
  
  ngOnInit(): void {
    this.time = 0;
  }
  
  toggleTimer() {
    this.isRunning = !this.isRunning;
    this.stopwatch();
  }
  
  stopwatch() {
    timer(0, 1000).subscribe(() => {
      if (this.isRunning) {
        this.time++;
        this.getDisplayTimer(this.time);
        this.startText = 'Pause';
      } else {
        this.startText = 'Start';
      }
    });
  }
  
  getDisplayTimer(time: number) {
    var hours = '' + Math.floor(time / 3600);
    var minutes = '' + Math.floor(time % 3600 / 60);
    var seconds = '' + Math.floor(time % 3600 % 60);
  
    if (Number(hours) < 10) {
      hours = '0' + hours;
    } else {
      hours = '' + hours;
    }
    if (Number(minutes) < 10) {
      minutes = '0' + minutes;
    } else {
      minutes = '' + minutes;
    }
    if (Number(seconds) < 10) {
      seconds = '0' + seconds;
    } else {
      seconds = '' + seconds;
    }
  
    this.displayTimer = hours + ':' + minutes + ':' + seconds;
  } */


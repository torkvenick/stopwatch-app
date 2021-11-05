import { BackgroundService } from './background.service';
import { Actions, State } from './../app/state.model';


export class ControlService {
  
  private seconds: number = 0;
  private intervalRef: any;
  private state: State = State.isStopped;


  private laps: number[] = [];

  time() {
    return this.secondsToDisplayedTime(this.seconds);
  }

  passSeconds() {
    return this.seconds;
  }
  passLaps() {
    return this.laps;
  }
  passState() {
    return this.state;
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

  // COUNTER CONTROLS
  onStartCounter() {
    if (this.intervalRef) {
      return;
    }
    this.intervalRef = setInterval(() => this.seconds++, 1000);
  }

  onPauseCounter() {
    clearInterval(this.intervalRef);
    this.intervalRef = undefined;
  }

  // BUTTONS SWITCH CONTROLS
  switchAction(action: Actions) {
    //do switch (best with default)
    switch (action) {
      case Actions.start:
        this.state = State.isRunning;
        console.log(this.state);
        this.onStartCounter();
        this.laps = [];
        break;
        case Actions.pause:
          this.state = State.isPaused;
          this.onPauseCounter();
          break;
          case Actions.resume:
            this.state = State.isRunning;
            this.onStartCounter();
            break;
      case Actions.stop:
        this.state = State.isStopped;
        this.seconds = 0;
        this.onPauseCounter();
        break;
      default:
        this.state = State.isStopped;
        this.seconds = 0;
        this.laps = [];
        break;
    }
  }
  // ADD LAPS
  addLap() {
    if (this.laps.length < 1) {
      return this.laps.push(this.seconds);
    }
    let sumOfLaps = (previousValue: number, currentValue: number) => previousValue + currentValue;
    let currentLap = this.seconds - this.laps.reduce(sumOfLaps);
    return this.laps.push(currentLap);
  }
}
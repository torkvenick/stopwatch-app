import { State } from './../app/state.model';

//type StorageKeys = 'storedStartTime' | 'storedPauseTime' | '...';

export class StorageService {

  storedState: string = 'storedState';
  storedLocalTime: string = 'storedLocalTime';
  storedPauseTime: string = 'storedPauseTime';
  storedLaps: string = 'storedLaps';


  stateToStorage(state: State) {
    const storedState: string = JSON.stringify(state);
    localStorage.setItem(this.storedState, storedState);
  }

  stateToData() {
    const savedState = localStorage.getItem(this.storedState);
    if (savedState === null) {
      return null;
    }
    const result = JSON.parse(savedState);
    return result;
  }


  timeToStorage(localTime: number) {
    const receivedTime: string = JSON.stringify(localTime);
    localStorage.setItem(this.storedLocalTime, receivedTime);
  }
  timeToData() {
    const savedLocalTime = localStorage.getItem(this.storedLocalTime);
    if (savedLocalTime === null) {
      return null;
    }
    const result = JSON.parse(savedLocalTime);
    return result;
  }
  clearStorage() {
    localStorage.removeItem(this.storedLocalTime);
    localStorage.removeItem(this.storedPauseTime);
    localStorage.removeItem(this.storedLaps);
  }

  pauseTimeToStorage(pauseTime: number) {
    const pausedTime: string = JSON.stringify(pauseTime);
    localStorage.setItem(this.storedPauseTime, pausedTime);
  }

  pauseTimeToData() {
    const pauseTime = localStorage.getItem(this.storedPauseTime);
    if (pauseTime === null) {
      return null;
    }
    const result = JSON.parse(pauseTime);
    return result;
  }

  lapsToStorage(laps: number[]) {
    const storedLap: string = JSON.stringify(laps);
    localStorage.setItem(this.storedLaps, storedLap);
  }

  lapsToData() {
    const savedLap = localStorage.getItem(this.storedLaps);
    if (savedLap === null) {
      return [];
    }
    const result = JSON.parse(savedLap);
    return result;
  }
}

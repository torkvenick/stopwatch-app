import { State } from './../app/state.model';

//type StorageKeys = 'storedStartTime' | 'storedPauseTime' | '...';

export class StorageService {

  storedState: string = 'storedState';
  storedLocalTime: string = 'storedLocalTime';
  storedPauseLocalTime: string = 'storedPauseLocalTime';
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
    localStorage.removeItem(this.storedState);
    localStorage.removeItem(this.storedLocalTime);
    localStorage.removeItem(this.storedPauseLocalTime);
    localStorage.removeItem(this.storedLaps);
  }

  pauseTimeToStorage(pauseTime: number) {
    const pausedTime: string = JSON.stringify(pauseTime);
    localStorage.setItem(this.storedPauseLocalTime, pausedTime);
  }

  pauseTimeToData() {
    const pauseTime = localStorage.getItem(this.storedPauseLocalTime);
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
      return null;
    }
    const result = JSON.parse(savedLap);
    return result;
  }
}

/*  startLocalTimeToStorage(time: number) {
   const storedStartLocalTime: string = JSON.stringify(time);
   localStorage.setItem(this.storedStartLocalTime, storedStartLocalTime);
 }

 startLocalTimeToData() {
   const savedStartLocalTime = localStorage.getItem(this.storedState);
   if (savedStartLocalTime === null) {
     return null;
   }
   const result = JSON.parse(savedStartLocalTime);
   return result;
 }
 //====================================================

 pauseLocalTimeToStorage(time: number) {
   const storedPauseLocalTime: string = JSON.stringify(time);
   localStorage.setItem(this.storedPauseLocalTime, storedPauseLocalTime);
 }

 pauseLocalTimeToData() {
   const savedPauseLocalTime = localStorage.getItem(this.storedState);
   if (savedPauseLocalTime === null) {
     return null;
   }
   const result = JSON.parse(savedPauseLocalTime);
   return result;
 }
 //====================================================

 resumeLocalTimeToStorage(time: number) {
   const storedResumeLocalTime: string = JSON.stringify(time);
   localStorage.setItem(this.storedResumeLocalTime, storedResumeLocalTime);
 }

 resumeLocalTimeToData() {
   const savedResumeLocalTime = localStorage.getItem(this.storedState);
   if (savedResumeLocalTime === null) {
     return null;
   }
   const result = JSON.parse(savedResumeLocalTime);
   return result;
 } */
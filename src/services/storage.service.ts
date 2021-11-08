import { Actions } from './../app/state.model';

//type StorageKeys = 'storedStartTime' | 'storedPauseTime' | '...';

export class StorageService {

  storedData: string[] = [
    'storedStartTime',
    'storedPauseTime',
    'storedResumeTime',
    'storedStopTime',
    'storedAction']

  toStorage(action: Actions, localTime: number) {
    const storedAction: string = JSON.stringify(action);
    const storedLocalTime: string = JSON.stringify(localTime);
    localStorage.setItem(this.storedData[4], storedAction);

    switch (action) {
      case Actions.start:
        localStorage.setItem(this.storedData[0], storedLocalTime);
        break;
      case Actions.pause:
        localStorage.setItem(this.storedData[1], storedLocalTime);
        break;
      case Actions.resume:
        localStorage.setItem(this.storedData[2], storedLocalTime);
        break;
      case Actions.stop:
        localStorage.setItem(this.storedData[3], storedLocalTime);
        break;
    }
  }
  
  storedActionToData() {
    const storedAction = localStorage.getItem(this.storedData[4]);
    if (storedAction === null) {
      return null;
    }
    const result = JSON.parse(storedAction);
    return result;
  }

  startLocalTimetoData() {
    const savedStartTime = localStorage.getItem(this.storedData[0]);
    if (savedStartTime === null) {
      return null;
    }
    const result = JSON.parse(savedStartTime);
    return result;
  }
  
  pauseLocalTimetoData() {
    const savedPauseTime = localStorage.getItem(this.storedData[1]);
    if (savedPauseTime === null) {
      return null;
    }
    const result = JSON.parse(savedPauseTime);
    return result;
  }

  resumeLocalTimetoData() {
    const savedResumeTime = localStorage.getItem(this.storedData[2]);
    if (savedResumeTime === null) {
      return null;
    }
    const result = JSON.parse(savedResumeTime);
    return result;
  }
  stopLocalTimetoData() {
    const savedStopTime = localStorage.getItem(this.storedData[3]);
    if (savedStopTime === null) {
      return null;
    }
    const result = JSON.parse(savedStopTime);
    return result;
  }
  
}
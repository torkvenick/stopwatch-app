import { State } from './../app/state.model';

//type StorageKeys = 'storedStartTime' | 'storedPauseTime' | '...';

export class StorageService {
    
  storedState: string = 'storedState';
  
  toStorage(state: State, localTime: number) {
    const storedStateAndLocalTime: string = JSON.stringify({state, localTime});
    localStorage.setItem(this.storedState, storedStateAndLocalTime);
  }

  toData() {
    const savedState = localStorage.getItem(this.storedState);
    if (savedState === null) {
      return null;
    }
    const result = JSON.parse(savedState);
    return result;
  }

  storedStartTime: string = 'storedStartTime';
  storedPauseTime: string = 'storedPauseTime';
  storedResumeTime: string = 'storedResumeTime';
  storedRefreshPageTime: string = 'storedRefreshPageTime';

  timeToStorage(time: number) {
  }
}
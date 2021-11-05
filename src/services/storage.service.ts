import { State } from './../app/state.model';

export class StorageService {
    
  storedState: string = 'storedState';
  
  toStorage(state: State) {
    const storedState: string = JSON.stringify(state);
    localStorage.setItem(this.storedState, storedState);
  }

  toData() {
    const savedState = localStorage.getItem(this.storedState);
    if (savedState === null) {
      return null;
    }
    const result = JSON.parse(savedState);
    return result;
  }
}
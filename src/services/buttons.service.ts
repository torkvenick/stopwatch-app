import { Actions } from './../app/state.model';

export class ButtonServices {

  private swButtons: Map<Actions, string> = new Map([
    [Actions.start, 'start'],
    [Actions.resume, 'resume'],
    [Actions.pause,'pause'],
    [Actions.stop,'stop']
  ]);

  buttonTitles(action: Actions) {
    return this.swButtons.get(action);
  }
  
  allButtons() {
    return Array.from(this.swButtons.keys());
  }
}


import {FunctionService} from "../../services/function-service";

export class Dialog {

  constructor(public functionService: FunctionService) {
    functionService.dataService.clickInside = functionService.dataService.backgroundDialogs().length > 0;
  }

  public close() {
    this.functionService.dataService.dialogs = this.functionService.dataService.dialogs.filter(dialog => !(this instanceof dialog));
  }
}


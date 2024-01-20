import {FunctionService} from "../../services/function-service";

export class Dialog {

  constructor(public functionService: FunctionService) {
    functionService.restService.dataService.clickInside = functionService.restService.dataService.backgroundDialogs().length > 0;
  }

  public close() {
    this.functionService.restService.dataService.dialogs = this.functionService.restService.dataService.dialogs.filter(dialog => !(this instanceof dialog));
  }
}


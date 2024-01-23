import {FunctionService} from "../../services/function-service";

export class Dialog {

  constructor(public functionService: FunctionService) {
  }

  public close() {
    setTimeout(() => this.functionService.dataService.dialogs = this.functionService.dataService.dialogs.filter(type => !(this instanceof type)), 1);
  }
}


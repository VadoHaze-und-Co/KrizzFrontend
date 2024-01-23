import {DataService} from "../../services/data-service";

export class Dialog {

  constructor(public dataService: DataService) {
  }

  public close() {
    setTimeout(() => this.dataService.dialogs = this.dataService.dialogs.filter(type => !(this instanceof type)), 1);
  }
}

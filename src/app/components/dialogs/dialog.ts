import {RestService} from "../../services/rest-service";
import {DataService} from "../../services/data-service";

export class Dialog {

  constructor(public restService: RestService, public dataService: DataService) {
  }

  public close() {
    this.dataService.dialogs = this.dataService.dialogs.filter(dialog => !(this instanceof dialog));
  }

  clickInside = false;
  clickBackground() {
    if (!this.clickInside) {
      this.close();
    }
    this.clickInside = false;
  }
  clickForeground() {
    this.clickInside = true;
  }
}


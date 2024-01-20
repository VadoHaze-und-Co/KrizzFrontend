import {RestService} from "../../services/rest-service";
import {DataService} from "../../services/data-service";
import {AppComponent} from "../../app.component";

export class Dialog {

  constructor(public restService: RestService, public dataService: DataService) {
    dataService.clickInside = dataService.backgroundDialogs().length > 0;
  }

  public close() {
    this.dataService.dialogs = this.dataService.dialogs.filter(dialog => !(this instanceof dialog));
  }
}


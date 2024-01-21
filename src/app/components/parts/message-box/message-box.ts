import {DataService} from "../../../services/data-service";

export class MessageBox {

  constructor(public color: string, public message: string) {
    setTimeout(() => DataService.messageBoxes = DataService.messageBoxes.filter(messageBox => messageBox != this), 5000);
  }
}

import {FunctionService} from "../../services/function-service";
import {Type} from "@angular/core";

export class Dialog {

  constructor(public functionService: FunctionService) {
    setTimeout(() => {
      let list = this.functionService.dataService.dialogs.filter(type => !(this instanceof type));
      if (list.length > 0) {
        console.log("TM")
        // for (let i = 0; i < list.length - 1; i++) {
        //   this.functionService.dataService.dialogs = this.functionService.dataService.dialogs.filter(d => d == list[i]);
        // }
      } else {
        console.log("OPEN")
        functionService.dataService.clickInside = true;
        this.functionService.dataService.dialogInstances.push({
          type: this.functionService.dataService.dialogs[this.functionService.dataService.dialogs.length - 1],
          dialog: this
        });
      }
    }, 2);
    console.log("me: " + this.functionService.dataService.dialogs.filter(type => this instanceof type).map(d => d.name));
    console.log("list: " + this.functionService.dataService.dialogs.map(d => d.name));
  }

  public close() {
    console.log("CLOSE " + this.functionService.dataService.dialogs.filter(type => this instanceof type).map(d => d.name))
    console.log(this.functionService.dataService.dialogInstances.length)
    this.functionService.dataService.dialogs = this.functionService.dataService.dialogs.filter(type => !(this instanceof type));
    this.functionService.dataService.dialogInstances = this.functionService.dataService.dialogInstances.filter(b => b.dialog != this);
    console.log(this.functionService.dataService.dialogInstances.length)
  }
}


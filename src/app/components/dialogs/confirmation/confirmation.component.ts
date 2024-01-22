import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Dialog} from "../dialog";
import {FunctionService} from "../../../services/function-service";

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent extends Dialog {

  constructor(functionService: FunctionService) {
    super(functionService);
  }

  public submit(yes: boolean) {
    let defined = this.functionService.dataService.confirmationConfirm !== undefined;
    let yef = this.functionService.dataService.confirmationConfirm!.yes;
    let nof = this.functionService.dataService.confirmationConfirm!.no;
    this.close();
    if (defined) {
      if (yes) {
        setTimeout(() => yef());
      } else {
        setTimeout(() => nof());
      }
    }
  }

  override close() {
    super.close();
    this.functionService.dataService.confirmationConfirm = undefined;
  }
}

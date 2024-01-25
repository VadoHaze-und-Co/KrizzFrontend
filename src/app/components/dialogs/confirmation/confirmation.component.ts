import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Dialog} from "../dialog";
import {DataService} from "../../../services/data-service";

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation.component.html',
  styleUrls: [
    './confirmation.component.css',
    '/src/app/main.css'
  ]
})
export class ConfirmationComponent extends Dialog {

  constructor(dataService: DataService) {
    super(dataService);
  }

  public submit(yes: boolean) {
    if (this.dataService.confirmationConfirm === undefined) {
      return;
    }
    let run = yes ? this.dataService.confirmationConfirm!.yes : this.dataService.confirmationConfirm!.no;
    if (run !== undefined) {
      run();
    }
    this.dataService.confirmationConfirm = undefined;
    this.close();
  }

  public hasInfo() {
    return this.dataService.confirmationConfirm?.info !== undefined;
  }
}

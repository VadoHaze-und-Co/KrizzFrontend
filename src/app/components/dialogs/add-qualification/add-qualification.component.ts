import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Dialog} from "../dialog";
import {FunctionService} from "../../../services/function-service";
import {DataService} from "../../../services/data-service";

@Component({
  selector: 'app-add-qualification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-qualification.component.html',
  styleUrl: './add-qualification.component.css'
})
export class AddQualificationComponent extends Dialog {

  public qualification = "";

  constructor(dataService: DataService, public functionService: FunctionService) {
    super(dataService);
  }

  public submit() {
    if (!this.functionService.qualificationValid(this.qualification)) {
      return;
    }
    this.functionService.addQualification(this.qualification);
    this.close();
    this.functionService.restService.loadQualifications();
  }
}

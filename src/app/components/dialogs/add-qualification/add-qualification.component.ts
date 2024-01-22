import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Dialog} from "../dialog";
import {FunctionService} from "../../../services/function-service";

@Component({
  selector: 'app-add-qualification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-qualification.component.html',
  styleUrl: './add-qualification.component.css'
})
export class AddQualificationComponent extends Dialog {

  constructor(functionService: FunctionService) {
    super(functionService);
  }

  public submit() {
    this.functionService.addQualification();
    this.close();
    this.functionService.restService.loadQualifications();
  }
}

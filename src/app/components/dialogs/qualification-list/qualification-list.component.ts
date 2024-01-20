import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Dialog} from "../dialog";
import {FunctionService} from "../../../services/function-service";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent extends Dialog {

  constructor(public override functionService: FunctionService) {
    super(functionService);
    functionService.restService.loadQualifications();
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Dialog} from "../dialog";
import {FunctionService} from "../../../services/function-service";
import {Qualification} from "../../../rest-objects/qualification";

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
    this.functionService.dataService.qualificationEdit = undefined;
    functionService.restService.loadQualifications();
  }

  public delete(qualification: Qualification) {
    this.functionService.dataService.confirmationConfirm = {
      title: "Qualifikation löschen?",
      yes: () => {
        this.functionService.deleteQualification(qualification)
        this.functionService.dataService.dialogs.push(QualificationListComponent);
      },
      no: () => {
        this.functionService.dataService.dialogs.push(QualificationListComponent);
      }
    }
  }
}

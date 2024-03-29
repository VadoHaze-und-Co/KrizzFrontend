import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Dialog} from "../dialog";
import {FunctionService} from "../../../services/function-service";
import {Qualification} from "../../../rest-objects/qualification";
import {DataService} from "../../../services/data-service";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qualification-list.component.html',
  styleUrls: [
    './qualification-list.component.css',
    '/src/app/main.css'
  ]
})
export class QualificationListComponent extends Dialog {

  public qualification = "";
  public qualificationEdit?: Qualification;

  constructor(dataService: DataService, public functionService: FunctionService) {
    super(dataService);
    functionService.restService.loadQualifications();
  }

  public add() {
    if (!this.functionService.qualificationValid(this.qualification)) {
      return;
    }
    this.functionService.addQualification(this.qualification);
    this.qualification = "";
  }

  public edit(qualification: Qualification) {
    if (this.qualificationEdit !== undefined) {
      this.qualificationEdit = undefined;
    }
    this.qualificationEdit = qualification.clone();
  }

  public save() {
    if (this.functionService.editQualification(this.qualificationEdit!)) {
      setTimeout(() => this.qualificationEdit = undefined, 10);
    }
  }

  public delete(qualification: Qualification) {
    let count = this.dataService.employees.filter(e => e.id != -1 && e.skills.includes(qualification.skill)).length;
    this.functionService.openConfirmation({
      title: "Qualifikation löschen?",
      info: count + " Mitarbeiter haben diese Qualifikation",
      yes: () => {
        this.functionService.deleteQualification(qualification);
      }
    });
  }
}

import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Qualification} from "../../../rest-objects/qualification";
import {RestService} from "../../../services/rest-service";
import {Observable, of} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {DataService} from "../../../services/data-service";
import {AddQualificationComponent} from "../../dialogs/add-qualification/add-qualification.component";
import {Dialog} from "../../dialogs/dialog";

@Component({
  selector: 'app-qualification-card',
  standalone: true,
  imports: [CommonModule, RestService],
  templateUrl: './qualification-card.component.html',
  styleUrl: './qualification-card.component.css'
})
export class QualificationCardComponent extends Dialog {

  @Input() public selectable: boolean = false;

  constructor(public override restService: RestService, public override dataService: DataService) {
    super(restService, dataService)
    this.restService.fetchQualificationData();
  }

  public containsSkill(qualification: Qualification) {
    return true;
    // if (!this.dataService.createEmployeeDialog) {
    //   return this.dataService.editingEmployee!.skills.filter(q => q == qualification.skill).length > 0;
    // }
    // return this.dataService.creatingEmployee.skills.filter(q => q == qualification.skill).length > 0;
  }

  protected readonly AddQualificationComponent = AddQualificationComponent;
}

import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Qualification} from "../../rest-objects/qualification";
import {RestService} from "../../services/rest-service";
import {Observable, of} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {DataService} from "../../services/data-service";

@Component({
  selector: 'app-qualification-card',
  standalone: true,
  imports: [CommonModule, RestService],
  templateUrl: './qualification-card.component.html',
  styleUrl: './qualification-card.component.css'
})
export class QualificationCardComponent {

  @Input() public selectable: boolean = false;

  constructor(public restService: RestService, public dataService: DataService) {
    this.restService.fetchQualificationData();
  }

  public containsSkill(qualification: Qualification) {
    if (!this.dataService.createEmployeeDialog) {
      return this.dataService.editingEmployee!.skills.filter(q => q == qualification.skill).length > 0;
    }
    return this.dataService.creatingEmployee.skills.filter(q => q == qualification.skill).length > 0;
  }
}

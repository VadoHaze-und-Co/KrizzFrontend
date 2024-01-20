import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Qualification} from "../../../rest-objects/qualification";
import {RestService} from "../../../services/rest-service";
import {DataService} from "../../../services/data-service";
import {AddQualificationComponent} from "../../dialogs/add-qualification/add-qualification.component";
import {Employee} from "../../../rest-objects/employee";

@Component({
  selector: 'app-qualification-card',
  standalone: true,
  imports: [CommonModule, RestService],
  templateUrl: './qualification-card.component.html',
  styleUrl: './qualification-card.component.css'
})
export class QualificationCardComponent {

  @Input() public selectable: boolean = false;
  @Input() public employee: Employee | undefined;

  constructor(public restService: RestService, public dataService: DataService) {
    this.restService.fetchQualificationData();
  }

  public containsSkill(qualification: Qualification) {
    return this.employee?.skills.includes(qualification.skill!);
  }

  protected readonly AddQualificationComponent = AddQualificationComponent;
}

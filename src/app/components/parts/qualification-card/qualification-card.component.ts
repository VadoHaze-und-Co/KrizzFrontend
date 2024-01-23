import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Qualification} from "../../../rest-objects/qualification";
import {Employee} from "../../../rest-objects/employee";
import {FunctionService} from "../../../services/function-service";
import {DataService} from "../../../services/data-service";

@Component({
  selector: 'app-qualification-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qualification-card.component.html',
  styleUrl: './qualification-card.component.css'
})
export class QualificationCardComponent {

  @Input() public selectable: boolean = false;
  @Input() public employee: Employee | undefined;

  constructor(public functionService: FunctionService, public dataService: DataService) {
    this.functionService.restService.loadQualifications();
  }

  public containsSkill(qualification: Qualification) {
    return this.employee?.skills.includes(qualification.skill!);
  }
}

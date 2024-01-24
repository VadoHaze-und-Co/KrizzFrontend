import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Qualification} from "../../../rest-objects/qualification";
import {Employee} from "../../../rest-objects/employee";
import {FunctionService} from "../../../services/function-service";
import {DataService} from "../../../services/data-service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-qualification-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qualification-card.component.html',
  styleUrls: [
    './qualification-card.component.css',
    '/src/app/main.css'
  ]
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

  public qualifications() {
    return this.dataService.qualifications.filter(q => q.skill.toLowerCase().includes(this.dataService.searchForQualification.toLowerCase()));
  }

  public height(out: boolean) {
    let h = out ? 120 : 100;
    if (this.selectable) {
      h += 20;
    }
    return h + 'px';
  }
}

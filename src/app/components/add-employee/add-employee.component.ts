import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataService} from "../../services/data-service";
import {Employee} from "../../rest-objects/employee";
import {QualificationCardComponent} from "../qualification-card/qualification-card.component";
import {AddQualificationComponent} from "../add-qualification/add-qualification.component";
import {Qualification} from "../../rest-objects/qualification";
import {RestService} from "../../services/rest-service";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, QualificationCardComponent, AddQualificationComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  @Input() public employee: Employee | undefined;
  addedQ: Qualification[] = [];
  removedQ: Qualification[] = [];

  constructor(public dataService: DataService, public restService: RestService) {
  }

  public save() {
    let employee = this.dataService.editEmployeeDialog!;
    if (employee !== undefined) {
      this.saveEdit(employee);
    } else {
      this.saveCreate();
    }
  }

  public saveEdit(employee: Employee) {
    this.addedQ = [];
    this.removedQ = [];
    let qualifications = this.dataService.selectedQualifications();
    let employeeQ:string[] = [];
    if (employee !== undefined) {
      employeeQ = employee.skills;
    }
    this.dataService.qualifications.forEach(q => {
      if (qualifications.includes(q) && !employeeQ.includes(q.skill!)) {
        this.addedQ.push(q);
      }
      if (!qualifications.includes(q) && employeeQ.includes(q.skill!)) {
        this.removedQ.push(q);
      }
    });
    this.addedQ.forEach(q => this.restService.addQualificationToEmployee(q, employee));
    this.removedQ.forEach(q => this.restService.removeQualificationFromEmployee(q, employee));
    employee.skills = qualifications.map(q => q.skill!);
  }

  public saveCreate() {
    console.log(this.dataService.selectedQualifications())
  }

  public close() {
    this.save();
    this.dataService.createEmployeeDialog = false;
    this.dataService.editEmployeeDialog = undefined;
  }

  clickInside = false;
  clickBackground() {
    if (!this.clickInside) {
      this.close();
    }
    this.clickInside = false;
  }
  clickForeground() {
    this.clickInside = true;
  }
}

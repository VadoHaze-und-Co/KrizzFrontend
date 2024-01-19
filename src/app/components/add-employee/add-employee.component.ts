import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataService} from "../../services/data-service";
import {Employee} from "../../rest-objects/employee";
import {QualificationCardComponent} from "../qualification-card/qualification-card.component";
import {AddQualificationComponent} from "../add-qualification/add-qualification.component";
import {Qualification} from "../../rest-objects/qualification";
import {RestService} from "../../services/rest-service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, QualificationCardComponent, AddQualificationComponent, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  @Input() public employee: Employee | undefined;
  addedQ: Qualification[] = [];
  removedQ: Qualification[] = [];

  constructor(public dataService: DataService, public restService: RestService) {
    setTimeout(() => {
      this.dataService.editingEmployee = new Employee(this.employee?.id, this.employee?.lastName, this.employee?.firstName, this.employee?.street, this.employee?.postcode, this.employee?.city, this.employee?.phone);
      this.dataService.editingEmployee.skills = this.employee?.skills!;
    }, 1);
  }

  public save() {
    let employee = this.dataService.editingEmployee!;
    if (!this.dataService.createEmployeeDialog) {
      this.saveEdit(employee);
    } else {
      this.saveCreate();
    }
    this.close();
  }

  private saveEdit(employee: Employee) {
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
    this.restService.editEmployee();
    this.dataService.employeeDetails = this.dataService.editingEmployee;
  }

  private saveCreate() {
    this.restService.createEmployee();
    this.dataService.creatingEmployee = new Employee(0, "", "", "", "", "", "")
  }

  public close() {
    this.dataService.createEmployeeDialog = false;
    this.dataService.editingEmployee = undefined;
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

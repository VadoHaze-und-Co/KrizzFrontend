import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddQualificationComponent} from "../add-qualification/add-qualification.component";
import {FormsModule} from "@angular/forms";
import {Dialog} from "../dialog";
import {QualificationCardComponent} from "../../parts/qualification-card/qualification-card.component";
import {Employee} from "../../../rest-objects/employee";
import {Qualification} from "../../../rest-objects/qualification";
import {RestService} from "../../../services/rest-service";
import {DataService} from "../../../services/data-service";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, QualificationCardComponent, AddQualificationComponent, FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent extends Dialog {

  @Input() public editing = false;
  @Input() public employee: Employee | undefined;

  constructor(public override restService: RestService, public override dataService: DataService) {
    super(restService, dataService);
    setTimeout(() => {
      while (this.employee === undefined) {}
      this.dataService.editingEmployee = new Employee(this.employee?.id, this.employee?.lastName, this.employee?.firstName, this.employee?.street, this.employee?.postcode, this.employee?.city, this.employee?.phone);
      this.dataService.editingEmployee.skills = this.employee?.skills!;
    });
  }

  public save() {
    let employee = this.dataService.editingEmployee!;
    if (this.editing) {
      this.saveEdit(employee);
    } else {
      this.saveCreate();
    }
    this.close();
  }

  private saveEdit(employee: Employee) {
    let addedQ:Qualification[] = [];
    let removedQ:Qualification[] = [];
    let qualifications = this.dataService.selectedQualifications();
    let employeeQ:string[] = [];
    if (employee !== undefined) {
      employeeQ = employee.skills;
    }
    this.dataService.qualifications.forEach(q => {
      if (qualifications.includes(q) && !employeeQ.includes(q.skill!)) {
        addedQ.push(q);
      }
      if (!qualifications.includes(q) && employeeQ.includes(q.skill!)) {
        removedQ.push(q);
      }
    });
    addedQ.forEach(q => this.restService.addQualificationToEmployee(q, employee));
    removedQ.forEach(q => this.restService.removeQualificationFromEmployee(q, employee));
    employee.skills = qualifications.map(q => q.skill!);
    this.restService.editEmployee();
    this.dataService.employeeDetails = this.dataService.editingEmployee;
  }

  private saveCreate() {
    this.restService.createEmployee();
    this.dataService.creatingEmployee = new Employee(0, "", "", "", "", "", "")
  }
}

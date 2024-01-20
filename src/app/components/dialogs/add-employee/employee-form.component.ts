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
import {AppComponent} from "../../../app.component";
import {EmployeeDetailsComponent} from "../employee-details/employee-details.component";

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, QualificationCardComponent, AddQualificationComponent, FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent extends Dialog {

  public editing = false;
  public employee!: Employee;

  constructor(public override restService: RestService, public override dataService: DataService) {
    super(restService, dataService);
  }

  public submit() {
    let e = this.employee.clone();
    this.close();
    setTimeout(() => {
      this.dataService.employeeDetails = e;
      if (this.editing) {
        this.dataService.dialogs.push(EmployeeDetailsComponent)
      }
    }, 10);
  }
}

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, QualificationCardComponent, AddQualificationComponent, FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class AddEmployeeComponent extends EmployeeFormComponent {
  public override editing = false;
  public override employee = this.dataService.creatingEmployee.clone();

  constructor(public override restService: RestService, public override dataService: DataService) {
    super(restService, dataService);
  }

  public override submit() {
    this.dataService.creatingEmployee = this.dataService.creatingEmployeeS.clone();
    this.restService.createEmployee();
    super.submit();
  }
}

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, QualificationCardComponent, AddQualificationComponent, FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EditEmployeeComponent extends EmployeeFormComponent {
  public override editing = true;
  public override employee = this.dataService.editingEmployee.clone();

  constructor(public override restService: RestService, public override dataService: DataService) {
    super(restService, dataService);
  }

  public override submit() {
    this.employee.skills = this.dataService.selectedQualifications().map(q => q.skill!);
    this.dataService.editingEmployee = this.employee;
    this.restService.editEmployee();
    super.submit();
  }
}

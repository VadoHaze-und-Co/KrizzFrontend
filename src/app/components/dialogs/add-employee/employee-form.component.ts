import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddQualificationComponent} from "../add-qualification/add-qualification.component";
import {FormsModule} from "@angular/forms";
import {Dialog} from "../dialog";
import {QualificationCardComponent} from "../../parts/qualification-card/qualification-card.component";
import {Employee} from "../../../rest-objects/employee";
import {EmployeeDetailsComponent} from "../employee-details/employee-details.component";
import {FunctionService} from "../../../services/function-service";

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

  constructor(public override functionService: FunctionService) {
    super(functionService);
  }

  public submit() {
    this.close();
    if (this.editing) {
      this.functionService.restService.dataService.dialogs.push(EmployeeDetailsComponent);
    }
    this.functionService.restService.dataService.employeeDetails = this.employee.clone();
    setTimeout(() => this.functionService.restService.loadEmployees(), 10);
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
  public override employee = this.functionService.restService.dataService.creatingEmployee.clone();

  constructor(public override functionService: FunctionService) {
    super(functionService);
  }

  public override submit() {
    this.functionService.restService.dataService.creatingEmployee = this.functionService.restService.dataService.creatingEmployeeS.clone();
    this.functionService.restService.createEmployee();
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
  public override employee = this.functionService.restService.dataService.editingEmployee.clone();

  constructor(public override functionService: FunctionService) {
    super(functionService);
  }

  public override submit() {
    this.employee.skills = this.functionService.restService.dataService.selectedQualifications().map(q => q.skill!);
    this.functionService.restService.dataService.editingEmployee = this.employee;
    this.functionService.restService.editEmployee();
    super.submit();
  }
}

import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddQualificationComponent} from "../add-qualification/add-qualification.component";
import {FormsModule} from "@angular/forms";
import {Dialog} from "../dialog";
import {QualificationCardComponent} from "../../parts/qualification-card/qualification-card.component";
import {Employee} from "../../../rest-objects/employee";
import {EmployeeDetailsComponent} from "../employee-details/employee-details.component";
import {FunctionService} from "../../../services/function-service";
import {DataService} from "../../../services/data-service";

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

  constructor(functionService: FunctionService) {
    super(functionService);
  }

  public submit() {
    this.close();
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

  constructor(public override functionService: FunctionService) {
    super(functionService);
    this.employee = new Employee();
  }

  public override submit() {
    if (this.functionService.employeeValid(this.employee)) {
      this.functionService.addEmployee(this.employee);
      super.submit();
    }
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

  constructor(public override functionService: FunctionService) {
    super(functionService);
    this.employee = this.functionService.dataService.employeeEdit.clone();
  }

  public override submit() {
    this.employee.skills = this.functionService.dataService.selectedQualifications().map(q => q.skill!);
    this.functionService.dataService.employeeEdit = this.employee;
    if (this.functionService.employeeValid(this.employee)) {
      this.functionService.editEmployee(this.employee);
      this.functionService.openDialog(EmployeeDetailsComponent);
      this.functionService.dataService.employeeDetails = this.employee.clone();
      super.submit();
    }
  }

  override close() {
    super.close();
    this.functionService.openDialog(EmployeeDetailsComponent);
  }
}

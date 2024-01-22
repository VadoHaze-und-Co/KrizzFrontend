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
  public override employee = this.functionService.dataService.employeeAdd.clone();

  public override submit() {
    this.functionService.dataService.employeeAdd = DataService.EMPLOYEE_EXAMPLE.clone();
    this.functionService.addEmployee();
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
  public override employee = this.functionService.dataService.employeeEdit.clone();

  public override submit() {
    this.employee.skills = this.functionService.dataService.selectedQualifications().map(q => q.skill!);
    if (!this.functionService.employeeValid(this.employee)) {
      this.employee.firstName = this.functionService.dataService.employeeEdit.firstName;
      this.employee.lastName = this.functionService.dataService.employeeEdit.lastName;
    }
    this.functionService.dataService.employeeEdit = this.employee;
    this.functionService.dataService.dialogs.push(EmployeeDetailsComponent);
    this.functionService.dataService.employeeDetails = this.employee.clone();
    this.functionService.editEmployee();
    super.submit();
  }

  override close() {
    super.close();
    this.functionService.dataService.dialogs.push(EmployeeDetailsComponent);
  }
}

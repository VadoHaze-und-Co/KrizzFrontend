import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddQualificationComponent} from "../add-qualification/add-qualification.component";
import {FormsModule} from "@angular/forms";
import {Dialog} from "../dialog";
import {QualificationCardComponent} from "../../parts/qualification-card/qualification-card.component";
import {Employee} from "../../../rest-objects/employee";
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

  constructor(dataService: DataService, public functionService: FunctionService) {
    super(dataService);
  }

  public type() {
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

  constructor(dataService: DataService, functionService: FunctionService) {
    super(dataService, functionService);
    this.employee = this.dataService.employeeAdd;
  }

  public override submit() {
    if (this.functionService.employeeValid(this.employee)) {
      this.functionService.addEmployee(this.employee);
      super.submit();
    }
  }

  override type() {
    this.employee.skills = this.dataService.selectedQualifications().map(q => q.skill);
    this.dataService.employeeAdd = this.employee;
  }

  override close() {
    super.close();
    this.employee = new Employee();
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

  constructor(dataService: DataService, functionService: FunctionService) {
    super(dataService, functionService);
    this.employee = this.dataService.employeeEdit.clone();
  }

  public override submit() {
    this.employee.skills = this.dataService.selectedQualifications().map(q => q.skill!);
    if (this.functionService.employeeValid(this.employee)) {
      this.functionService.editEmployee(this.employee);
      this.functionService.openEmployeeDetailsDialog(this.employee);
      super.submit();
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms"
import {DataService} from "../../../services/data-service";
import {FunctionService} from "../../../services/function-service";
import {Employee} from "../../../rest-objects/employee";
import {Dialog} from "../dialog";
import {QualificationCardComponent} from "../../parts/qualification-card/qualification-card.component";
import {QualiCardComponent} from "../../parts/quali-card/quali-card.component";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, QualificationCardComponent, FormsModule, QualiCardComponent],
  templateUrl: './add-employee.component.html',
  styleUrls: [
    './add-employee.component.css',
    '/src/app/main.css'
  ]
})
export class AddEmployeeComponent extends Dialog {

  public employee: Employee;
  constructor(dataService: DataService, public functionService: FunctionService) {
    super(dataService);
    this.employee = this.dataService.employeeAdd;
  }

  public submit() {
    if (this.functionService.employeeValid(this.employee)) {
      this.functionService.addEmployee(this.employee);
      this.close();
      setTimeout(() => this.functionService.restService.loadEmployees(), 10);
    }
  }

  type() {
    this.employee.skills = this.dataService.selectedQualifications().map(q => q.skill);
    this.dataService.employeeAdd = this.employee;
  }

  override close() {
    super.close();
    this.dataService.searchForQualification = "";
    this.dataService.employeeAdd = new Employee();
  }
}

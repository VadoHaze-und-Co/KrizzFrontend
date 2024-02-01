import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Dialog} from "../dialog";
import {Employee} from "../../../rest-objects/employee";
import {DataService} from "../../../services/data-service";
import {FunctionService} from "../../../services/function-service";
import {FormsModule} from "@angular/forms";
import {QualiCardComponent} from "../../parts/quali-card/quali-card.component";

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, QualiCardComponent],
  templateUrl: './edit-employee.component.html',
  styleUrls: [
    './edit-employee.component.css',
    '/src/app/main.css'
  ]
})
export class EditEmployeeComponent extends Dialog {

  public employee: Employee;
  constructor(dataService: DataService, public functionService: FunctionService) {
    super(dataService);
    this.employee = this.dataService.employeeEdit.clone();
  }

  public submit() {
    this.employee.skills = this.dataService.selectedQualifications().map(q => q.skill!);
    if (this.functionService.employeeValid(this.employee)) {
      this.functionService.editEmployee(this.employee);
      this.functionService.openEmployeeDetailsDialog(this.employee);
      this.close();
      setTimeout(() => this.functionService.restService.loadEmployees(), 10);
    }
  }

  type() {
    this.employee.skills = this.dataService.selectedQualifications().map(q => q.skill);
    this.dataService.employeeEdit = this.employee;
  }

  override close() {
    super.close();
    this.dataService.searchForQualification = "";
  }
}

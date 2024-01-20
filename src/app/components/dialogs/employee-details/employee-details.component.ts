import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeInitialsComponent} from "../../parts/employee-initials/employee-initials.component";
import {QualificationCardComponent} from "../../parts/qualification-card/qualification-card.component";
import {Dialog} from "../dialog";
import {EditEmployeeComponent, EmployeeFormComponent} from "../add-employee/employee-form.component";
import {FunctionService} from "../../../services/function-service";

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, EmployeeInitialsComponent, QualificationCardComponent, EmployeeFormComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent extends Dialog {

  constructor(public override functionService: FunctionService) {
    super(functionService);
    setTimeout(() => {
      while (this.employee === undefined) {}
      functionService.restService.loadQualificationsForEmployee(this.employee!);
    });
  }

  public get employee() {
    return this.functionService.restService.dataService.employeeDetails!;
  }

  public edit() {
    this.functionService.restService.dataService.editingEmployee = this.employee!;
    this.functionService.restService.dataService.dialogs.push(EditEmployeeComponent);
  }

  public delete() {
    this.functionService.restService.deleteEmployee(this.employee!.id!);
    this.close();
  }
}

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

  constructor(functionService: FunctionService) {
    super(functionService);
    functionService.restService.loadQualificationsForEmployee(this.employee!);
  }

  public get employee() {
    return this.functionService.dataService.employeeDetails!;
  }

  public edit() {
    this.functionService.dataService.employeeEdit = this.employee!;
    this.functionService.openDialog(EditEmployeeComponent);
  }

  public delete() {
    this.functionService.dataService.employees = this.functionService.dataService.employees.filter(e => e.id != this.employee.id);
    this.functionService.openConfirmation({
      title: "Mitarbeiter löschen?",
      yes: () => {
        this.functionService.deleteEmployee(this.employee!.id!);
        this.close();
      },
      no: () => {
        this.functionService.openDialog(EmployeeDetailsComponent);
      }
    });
  }
}

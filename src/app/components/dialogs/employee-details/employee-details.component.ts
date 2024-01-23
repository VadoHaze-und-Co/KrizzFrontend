import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeInitialsComponent} from "../../parts/employee-initials/employee-initials.component";
import {QualificationCardComponent} from "../../parts/qualification-card/qualification-card.component";
import {Dialog} from "../dialog";
import {EmployeeFormComponent} from "../add-employee/employee-form.component";
import {FunctionService} from "../../../services/function-service";
import {DataService} from "../../../services/data-service";

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, EmployeeInitialsComponent, QualificationCardComponent, EmployeeFormComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent extends Dialog {

  constructor(dataService: DataService, public functionService: FunctionService) {
    super(dataService);
    functionService.restService.loadQualificationsForEmployee(this.employee!);
  }

  public get employee() {
    return this.dataService.employeeDetails!;
  }

  public edit() {
    this.functionService.openEditEmployeeDialog(this.employee!);
  }

  public delete() {
    this.dataService.employees = this.dataService.employees.filter(e => e.id != this.employee.id);
    this.functionService.openConfirmation({
      title: "Mitarbeiter löschen?",
      yes: () => {
        this.functionService.deleteEmployee(this.employee!.id!);
        this.close();
      }
    });
  }
}

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
  styleUrls: [
    './employee-details.component.css',
    '/src/app/main.css'
  ]
})
export class EmployeeDetailsComponent extends Dialog {

  constructor(dataService: DataService, public functionService: FunctionService) {
    super(dataService);
    setTimeout(() => functionService.restService.loadQualificationsForEmployee(this.employee!), 1000)
  }

  public get employee() {
    return this.dataService.employeeDetails!;
  }

  public edit() {
    this.functionService.openEditEmployeeDialog(this.employee!);
  }

  public delete() {
    let id = this.employee.id;
    this.functionService.openConfirmation({
      title: "Mitarbeiter löschen?",
      yes: () => {
        this.dataService.employees = this.dataService.employees.filter(e => e.id != id);
        this.functionService.deleteEmployee(this.employee!.id!);
        this.close();
      }
    });
  }
}

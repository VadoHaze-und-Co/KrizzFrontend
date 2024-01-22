import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeInitialsComponent} from "../employee-initials/employee-initials.component";
import {Employee} from "../../../rest-objects/employee";
import {DataService} from "../../../services/data-service";
import {EmployeeDetailsComponent} from "../../dialogs/employee-details/employee-details.component";
import {FunctionService} from "../../../services/function-service";

@Component({
  selector: 'app-employee-card',
  standalone: true,
    imports: [CommonModule, EmployeeInitialsComponent],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {

  @Input() public employee: Employee | undefined;

  constructor(public functionService: FunctionService) {
  }

  public click() {
    this.functionService.dataService.employeeDetails = this.employee!;
    this.functionService.openDialog(EmployeeDetailsComponent);
  }
}

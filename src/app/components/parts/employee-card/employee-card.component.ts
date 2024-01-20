import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeInitialsComponent} from "../employee-initials/employee-initials.component";
import {Employee} from "../../../rest-objects/employee";
import {DataService} from "../../../services/data-service";
import {EmployeeFormComponent} from "../../dialogs/add-employee/employee-form.component";
import {QualificationCardComponent} from "../qualification-card/qualification-card.component";

@Component({
  selector: 'app-employee-card',
  standalone: true,
    imports: [CommonModule, EmployeeInitialsComponent],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {

  @Input() public employee: Employee | undefined;

  constructor(public dataService: DataService) {
  }

  public click() {
    this.dataService.employeeDetails = this.employee!;
    this.dataService.dialogs.push(EmployeeFormComponent);
  }
}

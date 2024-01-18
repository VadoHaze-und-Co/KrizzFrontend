import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeInitialsComponent} from "../employee-initials/employee-initials.component";
import {Employee} from "../../Employee";
import {DataService} from "../../services/data-service";

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
  }
}

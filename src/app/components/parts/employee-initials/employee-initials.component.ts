import {Component, Inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Employee} from "../../../rest-objects/employee";

@Component({
  selector: 'app-employee-initials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-initials.component.html',
  styleUrl: './employee-initials.component.css'
})
export class EmployeeInitialsComponent {

  @Input() employee: Employee | undefined;
  @Input() big: boolean = false;

  public initials(): string {
    if (this.employee === undefined) {
      return "";
    }
    return (this.employee.firstName.charAt(0)! + this.employee.lastName.charAt(0)!).toUpperCase();
  }
}

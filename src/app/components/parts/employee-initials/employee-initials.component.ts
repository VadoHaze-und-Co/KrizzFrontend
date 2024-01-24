import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Employee} from "../../../rest-objects/employee";

@Component({
  selector: 'app-employee-initials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-initials.component.html',
  styleUrls: [
    './employee-initials.component.css',
    '/src/app/main.css'
  ]
})
export class EmployeeInitialsComponent {

  @Input() employee: Employee | undefined;
  @Input() size: number = 1;

  public initials(): string {
    if (this.employee === undefined) {
      return "";
    }
    return (this.employee.firstName.charAt(0)! + this.employee.lastName.charAt(0)!).toUpperCase();
  }
}

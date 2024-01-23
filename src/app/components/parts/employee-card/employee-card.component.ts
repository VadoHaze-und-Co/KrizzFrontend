import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeInitialsComponent} from "../employee-initials/employee-initials.component";
import {Employee} from "../../../rest-objects/employee";
import {FunctionService} from "../../../services/function-service";

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [CommonModule, EmployeeInitialsComponent],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.css'
})
export class EmployeeCardComponent {

  @Input() public employee!: Employee;

  constructor(public functionService: FunctionService) {
  }

  public click() {
    this.functionService.openEmployeeDetailsDialog(this.employee!)
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Dialog} from "../dialog";
import {DataService} from "../../../services/data-service";
import {FunctionService} from "../../../services/function-service";
import {EmployeeInitialsComponent} from "../../parts/employee-initials/employee-initials.component";

@Component({
  selector: 'app-employee-qualification-list',
  standalone: true,
  imports: [CommonModule, EmployeeInitialsComponent],
  templateUrl: './employee-qualification-list.component.html',
  styleUrls: [
    './employee-qualification-list.component.css',
    '/src/app/main.css'
  ]
})
export class EmployeeQualificationListComponent extends Dialog {

  constructor(dataService: DataService, public functionService: FunctionService) {
    super(dataService);
  }

  public employees() {
    return this.dataService.employees.filter(e => e.skills.includes(this.dataService.watchingQualification?.skill!) && e.id != -1);
  }
}

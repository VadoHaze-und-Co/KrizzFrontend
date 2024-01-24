import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeInitialsComponent} from "../parts/employee-initials/employee-initials.component";
import {EmployeeCardComponent} from "../parts/employee-card/employee-card.component";
import {DataService} from "../../services/data-service";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeInitialsComponent, EmployeeCardComponent],
  templateUrl: './employee-list.component.html',
  styleUrls: [
    './employee-list.component.css',
    '/src/app/main.css'
  ]
})
export class EmployeeListComponent {

  constructor(public dataService: DataService) {
  }
}

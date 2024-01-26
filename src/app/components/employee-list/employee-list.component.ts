import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeInitialsComponent} from "../parts/employee-initials/employee-initials.component";
import {EmployeeCardComponent} from "../parts/employee-card/employee-card.component";
import {DataService} from "../../services/data-service";
import {Employee} from "../../rest-objects/employee";
import {query} from "@angular/animations";

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
  searchResults: Employee[] = [];

  constructor(public dataService: DataService) {

  }
}

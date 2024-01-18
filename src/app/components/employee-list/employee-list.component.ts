import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from "../../rest-objects/employee";
import { EmployeeInitialsComponent } from "../employee-initials/employee-initials.component";
import { EmployeeCardComponent } from "../employee-card/employee-card.component";
import {RestService} from "../../services/rest-service";
import {DefaultPopupComponent} from "../default-popup/default-popup.component";
import {DataService} from "../../services/data-service";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeInitialsComponent, EmployeeCardComponent, RestService, DefaultPopupComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  constructor(public restService: RestService, public dataService: DataService) {
    restService.fetchEmployeeData();
  }

  getGoodWidth() {
    let cardWidth= 170;
    return ((window.innerWidth / cardWidth) | 0) * cardWidth;
  }

  selectedEmployee: any;

  openEmployeeForm(employee: any) {
    this.selectedEmployee = employee;
  }

  closeEmployeeForm() {
    this.selectedEmployee = null;
  }
}

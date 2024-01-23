import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeInitialsComponent} from "../parts/employee-initials/employee-initials.component";
import {EmployeeCardComponent} from "../parts/employee-card/employee-card.component";
import {DefaultPopupComponent} from "../default-popup/default-popup.component";
import {DataService} from "../../services/data-service";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, EmployeeInitialsComponent, EmployeeCardComponent, DefaultPopupComponent],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {

  constructor(public dataService: DataService) {
  }
}

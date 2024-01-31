import {Component,} from '@angular/core';

import {DataService} from "../../../services/data-service";
import {FormsModule} from "@angular/forms";
import {Employee} from "../../../rest-objects/employee";
import {RouterOutlet} from "@angular/router";


@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  imports: [
    FormsModule,
    RouterOutlet
  ],
  styleUrl: './search-bar.component.css'
})


export class SearchBarComponent {
  constructor(public dataService: DataService) {
  }

  search(query: string): void {
    this.dataService.employees.forEach((employee: Employee) => {
      employee.isVisible = employee.employeeFullName(-1).toLowerCase().includes(query.toLowerCase());
    });
  }
}


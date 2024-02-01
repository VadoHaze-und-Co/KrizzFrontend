import {Component} from '@angular/core';

import {DataService} from "../../../services/data-service";
import {Employee} from "../../../rest-objects/employee";
import {FunctionService} from "../../../services/function-service";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrls: [
    './search-bar.component.css',
    '/src/app/main.css'
  ]
})
export class SearchBarComponent {
  constructor(public dataService: DataService, public functionService: FunctionService) {
  }

  search(query: string): void {
    this.dataService.employees.forEach((employee: Employee) => {
      employee.isVisible = employee.employeeFullName(-1).toLowerCase().includes(query.toLowerCase());
    });
  }
}


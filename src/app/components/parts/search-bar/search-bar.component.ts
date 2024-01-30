import { Component, } from '@angular/core';

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
  searchResults: Employee[] = [];
  inputstring = '';


  constructor(public dataService: DataService) {
  }




  search(query: string): void {
    console.log('TEST', query);
    this.dataService.employees = this.dataService.employees
      .filter((employee: Employee) =>
        employee.employeeFullName().toLowerCase().startsWith(query.toLowerCase()));

    }
}


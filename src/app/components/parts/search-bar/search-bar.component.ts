import { Component } from '@angular/core';

import {DataService} from "../../../services/data-service";

@Component({
  selector: 'app-search-bar',
  standalone: true,
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  public searchQuery: string ='';
  public filteredEmployees: any[] = [];
  constructor(private dataService: DataService) {
  }
  public searchEmployee() {
    this.filteredEmployees = this.dataService.employees.filter(employee =>
      employee.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}

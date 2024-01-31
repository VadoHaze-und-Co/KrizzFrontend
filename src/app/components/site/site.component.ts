import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeListComponent} from "../employee-list/employee-list.component";
import {LoginPageComponent} from "../login-page/login-page.component";
import {MessageBoxComponent} from "../parts/message-box/message-box.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {SearchBarComponent} from "../parts/search-bar/search-bar.component";
import {DataService} from "../../services/data-service";

@Component({
  selector: 'app-site',
  standalone: true,
    imports: [CommonModule, EmployeeListComponent, LoginPageComponent, MessageBoxComponent, NavbarComponent, SearchBarComponent],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent {

  constructor(public dataService: DataService) {
  }
}

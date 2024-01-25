import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFabButton} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {DataService} from "../../services/data-service";
import {FunctionService} from "../../services/function-service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatFabButton, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.css',
    '/src/app/main.css'
  ]
})
export class NavbarComponent {

  constructor(public dataService: DataService, public functionService: FunctionService) {
  }
}

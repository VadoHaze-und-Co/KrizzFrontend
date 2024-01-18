import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataService} from "../../services/data-service";
import {Employee} from "../../rest-objects/employee";
import {QualificationCardComponent} from "../qualification-card/qualification-card.component";
import {AddQualificationComponent} from "../add-qualification/add-qualification.component";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, QualificationCardComponent, AddQualificationComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  @Input() public employee: Employee | undefined;

  constructor(public dataService: DataService) {
  }

  public close() {
    this.dataService.createEmployeeDialog = false;
    this.dataService.editEmployeeDialog = undefined;
  }

  clickInside = false;
  clickBackground() {
    if (!this.clickInside) {
      this.close();
    }
    this.clickInside = false;
  }
  clickForeground() {
    this.clickInside = true;
  }
}

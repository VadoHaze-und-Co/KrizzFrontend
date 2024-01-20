import { CommonModule } from '@angular/common';
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {QualificationCardComponent} from "./components/parts/qualification-card/qualification-card.component";
import {RestService} from "./services/rest-service";
import {Employee} from "./rest-objects/employee";
import {DataService} from "./services/data-service";
import {QualificationListComponent} from "./components/dialogs/qualification-list/qualification-list.component";
import {AddQualificationComponent} from "./components/dialogs/add-qualification/add-qualification.component";
import {EmployeeDetailsComponent} from "./components/dialogs/employee-details/employee-details.component";
import {Component, ViewContainerRef} from "@angular/core";
import {EmployeeFormComponent} from "./components/dialogs/add-employee/employee-form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, QualificationCardComponent, RestService, QualificationListComponent, AddQualificationComponent, EmployeeDetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Employee Service';
  protected readonly window = window;

  constructor(public restService: RestService, public dataService: DataService) {
  }

  protected readonly Employee = Employee;

  protected readonly AddQualificationComponent = AddQualificationComponent;
  protected readonly QualificationListComponent = QualificationListComponent;
  protected readonly EmployeeFormComponent = EmployeeFormComponent;
}

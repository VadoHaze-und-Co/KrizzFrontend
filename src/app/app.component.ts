import {CommonModule} from '@angular/common';
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {QualificationCardComponent} from "./components/parts/qualification-card/qualification-card.component";
import {Employee} from "./rest-objects/employee";
import {QualificationListComponent} from "./components/dialogs/qualification-list/qualification-list.component";
import {AddQualificationComponent} from "./components/dialogs/add-qualification/add-qualification.component";
import {EmployeeDetailsComponent} from "./components/dialogs/employee-details/employee-details.component";
import {Component} from "@angular/core";
import {AddEmployeeComponent} from "./components/dialogs/add-employee/employee-form.component";
import {FunctionService} from "./services/function-service";
import {MessageBoxComponent} from "./components/parts/message-box/message-box.component";
import {RouterOutlet} from "@angular/router";
import {DataService} from "./services/data-service";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {SearchBarComponent} from "./components/parts/search-bar/search-bar.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, FunctionService, QualificationCardComponent, QualificationListComponent, AddQualificationComponent, EmployeeDetailsComponent, MessageBoxComponent, RouterOutlet, NavbarComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Employee Service';
  protected readonly window = window;
  protected readonly Employee = Employee;
  protected readonly AddQualificationComponent = AddQualificationComponent;
  protected readonly QualificationListComponent = QualificationListComponent;
  protected readonly AddEmployeeComponent = AddEmployeeComponent;

  constructor(public dataService: DataService, public functionService: FunctionService) {
  }
}

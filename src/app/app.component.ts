import {CommonModule} from '@angular/common';
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {QualificationListComponent} from "./components/dialogs/qualification-list/qualification-list.component";
import {AddQualificationComponent} from "./components/dialogs/add-qualification/add-qualification.component";
import {EmployeeDetailsComponent} from "./components/dialogs/employee-details/employee-details.component";
import {Component} from "@angular/core";
import {FunctionService} from "./services/function-service";
import {MessageBoxComponent} from "./components/parts/message-box/message-box.component";
import {RouterOutlet} from "@angular/router";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {SearchBarComponent} from "./components/parts/search-bar/search-bar.component";
import {AddEmployeeComponent} from "./components/dialogs/add-employee/add-employee.component";
import {QualificationCardComponent} from "./components/parts/qualification-card/qualification-card.component";
import {EditEmployeeComponent} from "./components/dialogs/edit-employee/edit-employee.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent, FunctionService, QualificationCardComponent, QualificationListComponent, AddQualificationComponent, EmployeeDetailsComponent, AddEmployeeComponent, EditEmployeeComponent, MessageBoxComponent, RouterOutlet, NavbarComponent, LoginPageComponent, SearchBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}

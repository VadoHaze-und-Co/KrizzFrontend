import {Component, HostListener, Input, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeeInitialsComponent} from "../../parts/employee-initials/employee-initials.component";
import {QualificationCardComponent} from "../../parts/qualification-card/qualification-card.component";
import {Dialog} from "../dialog";
import {Employee} from "../../../rest-objects/employee";
import {RestService} from "../../../services/rest-service";
import {DataService} from "../../../services/data-service";
import {EmployeeFormComponent} from "../add-employee/employee-form.component";

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, EmployeeInitialsComponent, QualificationCardComponent, EmployeeFormComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent extends Dialog {

  @Input() public employee!: Employee | undefined;

  constructor(public override restService: RestService, public override dataService: DataService) {
    super(restService, dataService);
    setTimeout(() => {
      while (this.employee === undefined) {}
      restService.fetchQualificationsForEmployee(this.employee!);
    });
  }

  public edit() {
    this.dataService.dialogs.push(EmployeeFormComponent);
    console.log(this.dataService.dialogs)
    this.dataService.editingEmployee = this.employee!;
  }

  public delete() {
    this.restService.deleteEmployee(this.employee!.id!);
    this.close();
  }
}

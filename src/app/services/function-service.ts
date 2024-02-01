import {Qualification} from "../rest-objects/qualification";
import {DataService} from "./data-service";
import {RestService} from "./rest-service";
import {Injectable, NgModule, Type} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Employee} from "../rest-objects/employee";
import {MessageBox} from "../components/parts/message-box/message-box";
import {CreateEmployee} from "../rest-objects/create-employee";
import {Dialog} from "../components/dialogs/dialog";
import {EmployeeDetailsComponent} from "../components/dialogs/employee-details/employee-details.component";
import {AddQualificationComponent} from "../components/dialogs/add-qualification/add-qualification.component";
import {QualificationListComponent} from "../components/dialogs/qualification-list/qualification-list.component";
import {
  EmployeeQualificationListComponent
} from "../components/dialogs/employee-qualification-list/employee-qualification-list.component";
import {AddEmployeeComponent} from "../components/dialogs/add-employee/add-employee.component";
import {EditEmployeeComponent} from "../components/dialogs/edit-employee/edit-employee.component";

@NgModule({
  imports: [HttpClientModule],
  providers: [HttpClientModule]
})
@Injectable({ providedIn: "root" })
export class FunctionService {

  public restService: RestService;

  constructor(http: HttpClient, private dataService: DataService) {
    this.restService = new RestService(http, this.dataService);
  }

  // Qualification

  public addQualification(name: string, select?: boolean) {
    this.restService.addQualification(name);
    if (select !== undefined && select) {
      this.dataService.employeeAdd.skills.push(name);
      this.dataService.employeeEdit.skills.push(name);
    }
  }

  public editQualification(qualification: Qualification) {
    let name = qualification.skill;
    if (!this.qualificationValid(name, qualification.id)) {
      return false;
    }
    let q = this.dataService.qualifications.find(q => q.id == qualification.id)!;
    if (name != q.skill) {
      this.restService.editQualification(q.id!, name);
    }
    return true;
  }

  public async deleteQualification(qualification: Qualification) {
    let affectedEmployees: Employee[] = this.dataService.employees
      .filter(e => e.skills.includes(qualification.skill!));
    while (affectedEmployees.length > 0) {
      await this.restService.asyncRemoveQualificationFromEmployee(qualification.skill!, affectedEmployees.shift()!.id!);
    }
    this.restService.deleteQualification(qualification.id!);
  }

  // Employee

  public addEmployee(employee: Employee) {
    if (!this.employeeValid(employee)) {
      return;
    }
    this.restService.createEmployee(new CreateEmployee(employee, this.dataService.selectedQualifications()));
  }

  public editEmployee(employee: Employee) {
    this.restService.editEmployee(new CreateEmployee(employee, this.dataService.selectedQualifications()));
  }

  public deleteEmployee(id: number) {
    this.restService.deleteEmployee(id);
  }

  // Validator

  public qualificationValid(name: string, id?: number) {
    if (this.empty(name, "Der Name")) {
      return false;
    }
    if (this.dataService.qualifications.filter(q => q.skill!.toLowerCase() == name.toLowerCase() && q.id != id).length >= 1) {
      this.showMessageBox("Diese Qualifikation existiert bereits", "#ff0000")
      return false;
    }
    return true;
  }

  public employeeValid(employee: Employee) {
    if (this.empty(employee.lastName, "Der Name")
      || this.empty(employee.firstName, "Der Name")
      || this.empty(employee.postcode, "Die Postleitzahl")
      || this.empty(employee.phone, "Die Telefonnummer")
      || this.empty(employee.street, "Die Straße")
      || this.empty(employee.city, "Die Stadt")) {
      return false;
    }
    if (employee.postcode.length != 5) {
      this.showMessageBox("Die Postleitzahl muss fünf Zeichen lang sein man", "#ff0000")
      return false;
    }
    let name = employee.employeeFullName(-1);
    if (this.dataService.employees.filter(q => q.employeeFullName(-1).toLowerCase() == name.toLowerCase() && q.id != employee.id).length >= 1) {
      this.showMessageBox("Dieser Mitarbeiter existiert bereits", "#ff0000")
      return false;
    }
    return true;
  }

  private empty(name?: string, field?: string) {
    if (name === undefined || name.length == 0) {
      this.showMessageBox((field === undefined ? "Das Feld" : field) + " darf nicht leer sein", "#ff0000")
      return true;
    }
    return false;
  }

  // Dialog

  public openQualificationListDialog() {
    this.openDialog(QualificationListComponent);
  }

  public openAddQualificationDialog() {
    this.openDialog(AddQualificationComponent);
  }

  public openAddEmployeeDialog() {
    this.openDialog(AddEmployeeComponent);
  }

  public openQualificationEmployeeListDialog(qualification: Qualification) {
    this.dataService.watchingQualification = qualification;
    this.openDialog(EmployeeQualificationListComponent);
  }

  public openEmployeeDetailsDialog(employee: Employee) {
    this.dataService.employeeDetails = employee;
    this.openDialog(EmployeeDetailsComponent);
  }

  public openEditEmployeeDialog(employee: Employee) {
    this.dataService.employeeEdit = employee;
    this.openDialog(EditEmployeeComponent);
  }

  public openConfirmation(confirmationConfirm: { title: string, info?: string, yes: (() => void), no?: (() => void) }) {
    setTimeout(() => this.dataService.confirmationConfirm = confirmationConfirm);
  }

  public showMessageBox(message: string, color: string) {
    let box = new MessageBox(color, message);
    this.dataService.messageBoxes.push(box);
    setTimeout(() => this.dataService.messageBoxes = this.dataService.messageBoxes.filter(messageBox => messageBox != box), 2300);
  }

  private openDialog(dialog: Type<Dialog>) {
    if (this.dataService.dialogs.map(d => d.name).includes(dialog.name)) {
      return;
    }
    setTimeout(() => this.dataService.dialogs.push(dialog));
  }

  public logout() {

  }
}

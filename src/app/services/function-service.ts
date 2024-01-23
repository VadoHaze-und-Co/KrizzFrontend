import {Qualification} from "../rest-objects/qualification";
import {DataService} from "./data-service";
import {RestService} from "./rest-service";
import {Injectable, NgModule, Type} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Employee} from "../rest-objects/employee";
import {MessageBox} from "../components/parts/message-box/message-box";
import {CreateEmployee} from "../rest-objects/create-employee";
import {Dialog} from "../components/dialogs/dialog";
import {ConfirmationComponent} from "../components/dialogs/confirmation/confirmation.component";

@NgModule({
  imports: [HttpClientModule],
  providers: [HttpClientModule]
})
@Injectable({ providedIn: "root" })
export class FunctionService {
  public restService: RestService;

  constructor(http: HttpClient, public dataService: DataService) {
    this.restService = new RestService(http, this.dataService);
  }

  // Qualification

  public addQualification() {
    let name = this.dataService.qualificationAdd;
    if (!this.qualificationValid(name)) {
      return;
    }
    this.restService.addQualification(name);
    this.dataService.qualificationAdd = "";
  }

  public editQualification(qualification: Qualification) {
    if (this.dataService.qualificationEdit !== undefined) {
      this.dataService.qualificationEdit = undefined;
    }
    this.dataService.qualificationEdit = {name: qualification.skill!, id: qualification.id!};
  }

  public saveQualification() {
    this.dataService.qualifications.filter(q => q.id == this.dataService.qualificationEdit?.id).forEach(q => {
      let name = this.dataService.qualificationEdit!.name;
      if (!this.qualificationValid(name)) {
        return;
      }
      if (name != q.skill) {
        this.restService.editQualification(q.id!, name);
      }
    });
    this.dataService.qualificationEdit = undefined;
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

  private empty(name?: string, field?: string) {
    if (name === undefined || name.length == 0) {
      this.showMessageBox((field === undefined ? "Das Feld" : field) + " darf nicht leer sein", "#ff0000")
      return true;
    }
    return false;
  }

  private qualificationValid(name: string) {
    if (this.empty(name)) {
      return false;
    }
    if (this.dataService.qualifications.filter(q => q.skill!.toLowerCase() == name.toLowerCase()).length >= 1) {
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

  // Utils

  public openDialog(dialog: Type<Dialog>) {
    if (this.dataService.dialogs.map(d => d.name).includes(dialog.name)) {
      return;
    }
    setTimeout(() => this.dataService.dialogs.push(dialog));
  }

  public openConfirmation(confirmationConfirm: {title: string, yes: (() => void), no: (() => void)} | undefined) {
    setTimeout(() => this.dataService.confirmationConfirm = confirmationConfirm);
  }

  public showMessageBox(message: string, color: string) {
    let box = new MessageBox(color, message);
    this.dataService.messageBoxes.push(box);
    setTimeout(() => this.dataService.messageBoxes = this.dataService.messageBoxes.filter(messageBox => messageBox != box), 2300);
  }
}

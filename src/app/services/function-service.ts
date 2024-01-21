import {Qualification} from "../rest-objects/qualification";
import {DataService} from "./data-service";
import {RestService} from "./rest-service";
import {Injectable, NgModule} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Employee} from "../rest-objects/employee";
import {MessageBox} from "../components/parts/message-box/message-box";
import {CreateEmployee} from "../rest-objects/create-employee";

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
    this.dataService.qualificationAdd = this.dataService.qualificationAdd = "";
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

  public addEmployee() {
    if (!this.employeeValid(this.dataService.employeeAdd)) {
      return;
    }
    this.restService.createEmployee(new CreateEmployee(this.dataService.employeeAdd, this.dataService.selectedQualifications()));
  }

  public editEmployee() {
    this.restService.editEmployee(new CreateEmployee(this.dataService.employeeEdit, this.dataService.selectedQualifications()));
    return true;
  }

  public deleteEmployee(id: number) {
    this.restService.deleteEmployee(id);
  }

  // Validator

  private empty(name: string) {
    if (name.length == 0) {
      DataService.messageBoxes.push(new MessageBox("#ff0000", "Der Name darf nicht leer sein"))
      return true;
    }
    return false;
  }

  private qualificationValid(name: string) {
    if (this.empty(name)) {
      return false;
    }
    if (this.dataService.qualifications.filter(q => q.skill!.toLowerCase() == name.toLowerCase()).length >= 1) {
      DataService.messageBoxes.push(new MessageBox("#ff0000", "Diese Qualifikation existiert bereits"))
      return false;
    }
    return true;
  }

  public employeeValid(employee: Employee) {
    let name = employee.employeeFullName(-1);
    if (this.empty(name)) {
      return false;
    }
    if (this.dataService.employees.filter(q => q.employeeFullName(-1).toLowerCase() == name.toLowerCase() && q.id != employee.id).length >= 1) {
      DataService.messageBoxes.push(new MessageBox("#ff0000", "Dieser Mitarbeiter existiert bereits"))
      return false;
    }
    return true;
  }
}

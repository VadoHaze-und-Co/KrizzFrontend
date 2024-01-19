import {Employee} from "../rest-objects/employee";
import {Injectable} from "@angular/core";
import {Qualification} from "../rest-objects/qualification";

@Injectable({ providedIn: "root" })
export class DataService {

  public employees: Employee[] = [];
  public qualifications: Qualification[] = [];

  public createQualificationDialog = false;
  public employeeDetails: Employee | undefined;
  public qualificationListDialog = false;
  public qualificationEdit: {name: string, id: number} | undefined;

  public addNewText = "";
  public addQualification = "";

  public createEmployeeDialog = false;
  public editEmployeeDialog : Employee | undefined;

  public selectedQualifications() {
    let qualifications: Qualification[] = [];
    for (let i = 0; i < document.getElementsByClassName("select-button").length; i++) {
      let e = (<HTMLInputElement>document.getElementsByClassName("select-button").item(i));
      let qualification = this.qualifications.find(q => q.id == parseInt(e.name));
      if (qualification === undefined || !e.checked) {
        continue;
      }
      qualifications.push(qualification);
    }
    return qualifications;
  }
}

import {Employee} from "../rest-objects/employee";
import {Injectable, Type} from "@angular/core";
import {Qualification} from "../rest-objects/qualification";
import {Dialog} from "../components/dialogs/dialog";

@Injectable({ providedIn: "root" })
export class DataService {

  public employees: Employee[] = [];
  public qualifications: Qualification[] = [];
  public dialogs: Type<Dialog>[] = [];

  // Qualification
  public qualificationEdit: {name: string, id: number} | undefined;
  public addQualificationText = "";

  // Employees
  public creatingEmployeeS = new Employee(-1, "Testname", "Aaron", "Street", "12434", "Brementown", "+2145342659");
  public employeeDetails = this.creatingEmployeeS;
  public creatingEmployee = this.creatingEmployeeS;
  public editingEmployee = this.creatingEmployeeS;

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

  public backgroundDialogs() {
    let dialogs: Type<Dialog>[] = [];
    for (let i = 0; i < this.dialogs.length - 1; i++) {
      dialogs[i] = this.dialogs[i];
    }
    return dialogs;
  }

  public foregroundDialog() {
    return this.dialogs.length > 0 ? this.dialogs[this.dialogs.length - 1] : undefined;
  }

  clickInside = false;
  clickBackground(type: Type<Dialog>) {
    if (!this.clickInside) {
      this.addQualificationText = "";
      this.dialogs = this.dialogs.filter(dialog => type != dialog);
    }
    this.clickInside = false;
  }

  clickForeground() {
    this.clickInside = true;
  }
}

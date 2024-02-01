import {Employee} from "../rest-objects/employee";
import {Injectable, Type} from "@angular/core";
import {Qualification} from "../rest-objects/qualification";
import {Dialog} from "../components/dialogs/dialog";
import {MessageBox} from "../components/parts/message-box/message-box";
import {ConfirmationComponent} from "../components/dialogs/confirmation/confirmation.component";
import {HttpHeaders} from "@angular/common/http";
import {AddEmployeeComponent} from "../components/dialogs/add-employee/add-employee.component";
import {EditEmployeeComponent} from "../components/dialogs/edit-employee/edit-employee.component";

@Injectable({providedIn: "root"})
export class DataService {

  public header: HttpHeaders | undefined;
  public loginUsername = "";
  public loginPassword = "";

  // Running data
  public employees: Employee[] = [];
  public qualifications: Qualification[] = [];
  public dialogs: Type<Dialog>[] = [];
  public messageBoxes: MessageBox[] = [];

  // Qualification
  public searchForQualification = "";
  public watchingQualification: Qualification | undefined;

  // Employees
  public employeeDetails = new Employee();
  public employeeAdd = new Employee();
  public employeeEdit = new Employee();

  private _confirmationConfirm: { title: string, info?: string, yes: (() => void), no?: (() => void) } | undefined;

  public get confirmationConfirm() {
    return this._confirmationConfirm;
  }

  public set confirmationConfirm(confirmationConfirm: {
    title: string,
    info?: string,
    yes: (() => void),
    no?: (() => void)
  } | undefined) {
    this._confirmationConfirm = confirmationConfirm;
    if (confirmationConfirm !== undefined) {
      this.dialogs.push(ConfirmationComponent);
    }
  }

  public get screenWidth() {
    return window.innerWidth;
  }

  public get screenHeight() {
    return window.innerHeight;
  }

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
  clickBackground() {
    if (!this.clickInside) {
      let d = this.dialogs[this.dialogs.length - 1];
      if (d.name == AddEmployeeComponent.name || d.name == EditEmployeeComponent.name) {
        if (d.name == AddEmployeeComponent.name) {
          this.employeeAdd = new Employee();
        }
        this.searchForQualification = "";
      }
      this.dialogs.pop();
    }
    this.clickInside = false;
  }

  clickForeground() {
    this.clickInside = true;
  }

  public goodListWidth() {
    let cardWidth = 170;
    return ((this.screenWidth / cardWidth) | 0) * cardWidth;
  }
}

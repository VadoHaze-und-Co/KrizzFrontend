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
}

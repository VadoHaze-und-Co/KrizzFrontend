import {Injectable, NgModule} from "@angular/core";
import {Observable, of} from "rxjs";
import {Employee} from "../rest-objects/employee";
import {Qualification} from "../rest-objects/qualification";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {EmployeeQualification} from "../rest-objects/employee-qualification";
import {DataService} from "./data-service";
import {Token} from "../rest-objects/token";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [ HttpClientModule ]
})
@Injectable({ providedIn: "root" })
export class RestService {
  bearer = "";
  option: {headers: HttpHeaders} | undefined;

  public token(run: () => void) {
    this.http.post<Token>('http://authproxy.szut.dev',
      `grant_type=password&client_id=employee-management-service&username=user&password=test`,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).subscribe(token=> {
      this.bearer = token.access_token!;
      this.option = {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${this.bearer}`)
      };
      run();
    });
  }

  constructor(public http: HttpClient, public dataService: DataService) {
  }

  fetchEmployeeData(func?: () => void) {
    this.http.get<Employee[]>('https://employee.szut.dev/employees', this.option).subscribe(data => {
      this.dataService.employees = data
        .map(employee => new Employee(employee.id, employee.lastName, employee.firstName, employee.street, employee.postcode, employee.city, employee.phone))
        .sort((e1,e2)=> e1.employeeFullName().localeCompare(e2.employeeFullName()));
      if (func !== undefined) {
        func();
      }
      this.dataService.employees.forEach(e=>this.fetchQualificationsForEmployee(e));
    }, error => this.token(() => this.fetchEmployeeData()));
  }

  fetchQualificationData(func?: () => void) {
    this.http.get<Qualification[]>('https://employee.szut.dev/qualifications', this.option).subscribe(data => {
      this.dataService.qualifications = data
        .filter(q => q.skill !== undefined)
        .sort((a,b) => a.skill!.localeCompare(b.skill!)!);
      if (func !== undefined) {
        func();
      }
    }, error => this.token(() => this.fetchQualificationData()))
  }

  public fetchQualificationsForEmployee(employee: Employee, func?: () => void) {
    this.http.get<EmployeeQualification>('https://employee.szut.dev/employees/' + employee.id + '/qualifications',
      this.option).subscribe(employeeData => {
      let skills: string[] = employeeData.skillSet?.map(skill => skill.skill) || [];
      skills = skills.sort((a,b)=>a.localeCompare(b));
      employee.skills = skills;
      if (func !== undefined) {
        func();
      }
    }, error => this.token(() => this.fetchQualificationsForEmployee(employee)));
  }

  public _addQualificationToEmployee(qualificationName: string, employeeId: number, func?: () => void) {
    this.http.post('https://employee.szut.dev/employees/' + employeeId + '/qualifications',
      `{"skill":"` + qualificationName + `"}`, this.option).subscribe(data => {
      if (func !== undefined) {
        func();
      }
    }, error => this.token(() => this._addQualificationToEmployee(qualificationName, employeeId)));
  }

  public _removeQualificationFromEmployee(qualificationName: string, employeeId: number, func?: () => void) {
    this.http.delete('https://employee.szut.dev/employees/' + employeeId + '/qualifications',
      { headers: this.option?.headers, body: {skill: qualificationName}}).subscribe(data => {
      if (func !== undefined) {
        func();
      }
    }, error => this.token(() => this._removeQualificationFromEmployee(qualificationName, employeeId)));
  }

  public _addQualification(name: string) {
    this.http.post('https://employee.szut.dev/qualifications',
      `{"skill":"` + name + `"}`, this.option).subscribe(data => {
      this.fetchQualificationData();
    }, error => this.token(() => this._addQualification(name)));
  }

  public _deleteQualification(id: number) {
    this.http.delete('https://employee.szut.dev/qualifications/' + id, this.option).subscribe(data => {
      this.fetchQualificationData();
    }, error => this.token(() => this._deleteQualification(id)));
  }

  public _editQualification(id: number, name: string) {
    this.http.put('https://employee.szut.dev/qualifications/' + id,
      `{"skill":"` + name + `"}`, this.option).subscribe(data => {
      this.fetchQualificationData();
    }, error => this.token(() => this._editQualification(id, name)));
  }

  public addQualification() {
    // TODO: error message
    let name = this.dataService.createQualificationDialog ? this.dataService.addQualification : this.dataService.addNewText;
    if (name.length == 0) {
      console.log("error: name cannot be empty")
      return;
    }
    if (this.dataService.qualifications.filter(q => q.skill!.toLowerCase() == name.toLowerCase()).length >= 1) {
      console.log("error: name already exists")
      return;
    }
    this._addQualification(name);
    this.dataService.addNewText = this.dataService.addQualification = "";
  }

  public deleteQualification(qualification: Qualification) {
    this.fetchEmployeeData(() => this.dataService.employees.forEach(e => {
      this.fetchQualificationsForEmployee(e, () => {
        if (e.skills.includes(qualification.skill!)) {
          this.removeQualificationFromEmployee(qualification, e);
        }
      });
    }));
    setTimeout(() => this._deleteQualification(qualification.id!), 10);
  }

  public editQualification(qualification: Qualification) {
    // TODO: error message
    if (this.dataService.qualificationEdit !== undefined) {
      console.log("You are already editing something")
      return;
    }
    this.dataService.qualificationEdit = { name: qualification.skill!, id: qualification.id! };
  }

  public saveQualification() {
    this.dataService.qualifications.filter(q => q.id == this.dataService.qualificationEdit?.id).forEach(q => {
      let name = this.dataService.qualificationEdit!.name;
      if (name != q.skill) {
        this._editQualification(q.id!, name);
      }
    });
    this.dataService.qualificationEdit = undefined;
  }

  public addQualificationToEmployee(qualification: Qualification, employee: Employee, func?: () => void) {
    this._addQualificationToEmployee(qualification.skill!, employee.id!, func);
  }

  public removeQualificationFromEmployee(qualification: Qualification, employee: Employee, func?: () => void) {
    this._removeQualificationFromEmployee(qualification.skill!, employee.id!, func);
  }
}

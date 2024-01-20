import {Injectable, NgModule} from "@angular/core";
import {Observable, of} from "rxjs";
import {Employee} from "../rest-objects/employee";
import {Qualification} from "../rest-objects/qualification";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {EmployeeQualification} from "../rest-objects/employee-qualification";
import {DataService} from "./data-service";
import {Token} from "../rest-objects/token";
import {CreateEmployee} from "../rest-objects/create-employee";

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [ HttpClientModule ]
})
@Injectable({ providedIn: "root" })
export class RestService {
  bearer = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzUFQ0dldiNno5MnlQWk1EWnBqT1U0RjFVN0lwNi1ELUlqQWVGczJPbGU0In0.eyJleHAiOjE3MDU3MjQ2ODYsImlhdCI6MTcwNTcyMTA4NiwianRpIjoiY2I5YTZlYWUtODQ4ZC00ZTY3LThhZDEtNDY0OGJiMTI5YThlIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5zenV0LmRldi9hdXRoL3JlYWxtcy9zenV0IiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjU1NDZjZDIxLTk4NTQtNDMyZi1hNDY3LTRkZTNlZWRmNTg4OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImVtcGxveWVlLW1hbmFnZW1lbnQtc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJhNzQ5MzE3Ny01Njg0LTQxNjctYWYyZi05MWRiYmZiY2FmYmUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicHJvZHVjdF9vd25lciIsIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1zenV0IiwidW1hX2F1dGhvcml6YXRpb24iLCJ1c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6InVzZXIifQ.LXaJR0uBcu2rEftXbCPZy5tB0QRy2bSVcuungRpooSfiu7bOofG_PPuGfGvligzdirK6809WpLri4oyx5TGtEJ3UJun8PwP6AQa86ShnTHsycE2j-77l04yCOEHB1n_Bv209A6cB37cuLDoiCOiY3LKACBfZKfAHVyVU_RjFQnujpIUz6vFUtXg8yKKbebcfrE1kZ6bDTdDLvA1h27DUJX7mX3lodyr-fNI1VBuzMHYfdXb560ttoND_kK_f3yBFaZf2HIcFyAsiD8Ma6As7i99T4yWhWu_hx24pw_1vlNtbLaqLWp9PjMNGiHLvTFASnyVIOUWWtEjBQhU6yc5LOw";
  option: {headers: HttpHeaders} | undefined = {headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearer}`)};

  constructor(public http: HttpClient, public dataService: DataService) {
    this.token(() => {
      this.fetchQualificationData();
      this.fetchEmployeeData();
    });
  }

  public token(run: () => void) {
    // this.http.post<Token>('http://authproxy.szut.dev',
    //   `grant_type=password&client_id=employee-management-service&username=user&password=test`,
    //   { headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded') }
    // ).subscribe(token=> {
    //   this.bearer = token.access_token!;
    //   this.option = {
    //     headers: new HttpHeaders()
    //       .set('Content-Type', 'application/json')
    //       .set('Authorization', `Bearer ${token.access_token!}`)
    //   };
    //   run();
    // });
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
    });
  }

  fetchQualificationData(func?: () => void) {
    this.http.get<Qualification[]>('https://employee.szut.dev/qualifications', this.option).subscribe(data => {
      this.dataService.qualifications = data
        .filter(q => q.skill !== undefined)
        .sort((a,b) => a.skill!.localeCompare(b.skill!)!);
      if (func !== undefined) {
        func();
      }
    })
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
    });
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
    });
  }

  public _addQualification(name: string) {
    this.http.post('https://employee.szut.dev/qualifications',
      `{"skill":"` + name + `"}`, this.option).subscribe(data => {
      this.fetchQualificationData();
    });
  }

  public _deleteQualification(id: number) {
    this.http.delete('https://employee.szut.dev/qualifications/' + id, this.option).subscribe(data => {
      this.fetchQualificationData();
    });
  }

  public _editQualification(id: number, name: string) {
    this.http.put('https://employee.szut.dev/qualifications/' + id,
      `{"skill":"` + name + `"}`, this.option).subscribe(data => {
      this.fetchQualificationData();
    });
  }

  public addQualification() {
    // TODO: error message
    let name = this.dataService.addQualificationText;
    if (name.length == 0) {
      console.log("error: name cannot be empty")
      return;
    }
    if (this.dataService.qualifications.filter(q => q.skill!.toLowerCase() == name.toLowerCase()).length >= 1) {
      console.log("error: name already exists")
      return;
    }
    this._addQualification(name);
    this.dataService.addQualificationText = this.dataService.addQualificationText = "";
  }

  public deleteQualification(qualification: Qualification) {
    this.dataService.employees.forEach(e => {
      this.fetchQualificationsForEmployee(e, () => {
        if (e.skills.includes(qualification.skill!)) {
          this.removeQualificationFromEmployee(qualification, e);
        }
      });
    });
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

  public editEmployee() {
    let e = new CreateEmployee(this.dataService.editingEmployee, this.dataService.selectedQualifications());
    this.http.put('https://employee.szut.dev/employees/' + this.dataService.editingEmployee.id!, e, this.option).subscribe(data => {
      this.fetchEmployeeData();
    });
  }

  public addQualificationToEmployee(qualification: Qualification, employee: Employee, func?: () => void) {
    this._addQualificationToEmployee(qualification.skill!, employee.id!, func);
  }

  public removeQualificationFromEmployee(qualification: Qualification, employee: Employee, func?: () => void) {
    this._removeQualificationFromEmployee(qualification.skill!, employee.id!, func);
  }

  public createEmployee() {
    let e = new CreateEmployee(this.dataService.creatingEmployee, this.dataService.selectedQualifications());
    this.http.post('https://employee.szut.dev/employees/', e, this.option).subscribe(data => {
      this.fetchEmployeeData();
    });
  }

  public deleteEmployee(id: number) {
    this.http.delete('https://employee.szut.dev/employees/' + id, this.option).subscribe(data => {
      this.fetchEmployeeData();
    });
  }
}

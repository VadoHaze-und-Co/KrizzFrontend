import {Employee} from "../rest-objects/employee";
import {Qualification} from "../rest-objects/qualification";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EmployeeQualification} from "../rest-objects/employee-qualification";
import {DataService} from "./data-service";
import {Token} from "../rest-objects/token";
import {CreateEmployee} from "../rest-objects/create-employee";
import {catchError, EMPTY, firstValueFrom} from "rxjs";

export class RestService {

  constructor(private http: HttpClient, public dataService: DataService) {
    let token = localStorage.getItem("token");
    if (token === null || token == "") {
      return;
    }
    this.createHeader(token);
  }

  public loadToken(loginUsername: string, loginPassword: string) {
    return this.http.post<Token>('http://authproxy.szut.dev',
      `grant_type=password&client_id=employee-management-service&username=` + loginUsername + `&password=` + loginPassword,
      {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')});
  }

  public createHeader(token: string) {
    this.dataService.header = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Bearer ' + token);
    this.loadQualifications();
    this.loadEmployees();
  }

  private async httpRequest(url: string, method: string, func: (data: any) => void, body?: any) {
    let option = {headers: this.dataService.header, body: body};
    this.http.request(method, url, option)
      .pipe(catchError(error => {
        if (error.status == 401) {
          this.dataService.header = undefined;
        }
        return EMPTY;
      })).subscribe(data => func(data));
  }

  // LOAD

  public loadEmployees() {
    this.httpRequest('https://employee.szut.dev/employees', 'GET', data => {
      this.dataService.employees = (data as Employee[])
        .map(employee => new Employee(employee.id, employee.lastName, employee.firstName, employee.street, employee.postcode, employee.city, employee.phone))
        .sort((e1, e2) => e1.employeeFullName().localeCompare(e2.employeeFullName()));
      this.dataService.employees.forEach(employee => this.loadQualificationsForEmployee(employee));
    });
  }

  public loadQualifications() {
    this.httpRequest('https://employee.szut.dev/qualifications', 'GET', data => {
      this.dataService.qualifications = (data as Qualification[])
        .map(q => new Qualification(q.skill, q.id))
        .filter(q => q.skill !== undefined)
        .sort((a, b) => a.skill!.localeCompare(b.skill!)!);
    });
  }

  public loadQualificationsForEmployee(employee: Employee, func?: () => void) {
    if (!this.dataService.employees.map(e => e.id).includes(employee.id)) {
      return;
    }
    this.httpRequest('https://employee.szut.dev/employees/' + employee.id + '/qualifications', 'GET', data => {
      employee.skills = (data as EmployeeQualification)
        .skillSet?.map(skill => skill.skill)
        .sort((a, b) => a.localeCompare(b)) || [];
      if (func !== undefined) {
        func();
      }
    })
  }

  // QUALIFICATION

  public addQualification(name: string) {
    this.httpRequest('https://employee.szut.dev/qualifications', 'POST',
      data => this.loadQualifications(),
      {skill: name});
  }

  public deleteQualification(id: number) {
    this.httpRequest('https://employee.szut.dev/qualifications/' + id, 'DELETE',
      data => this.loadQualifications());
  }

  public editQualification(id: number, name: string) {
    this.httpRequest('https://employee.szut.dev/qualifications/' + id, 'PUT',
      () => {
        this.loadQualifications();
        this.dataService.employees.forEach(e => this.loadQualificationsForEmployee(e));
      },
      {skill: name});
  }

  public async asyncRemoveQualificationFromEmployee(qualificationName: string, employeeId: number) {
    await firstValueFrom(this.http.delete('https://employee.szut.dev/employees/' + employeeId + '/qualifications',
      {headers: this.dataService.header, body: {skill: qualificationName}}));
  }

  // EMPLOYEE

  public createEmployee(createEmployee: CreateEmployee) {
    this.httpRequest('https://employee.szut.dev/employees/', 'POST',
      data => this.loadEmployees(), createEmployee);
  }

  public editEmployee(createEmployee: CreateEmployee) {
    this.httpRequest('https://employee.szut.dev/employees/' + this.dataService.employeeEdit.id!, 'PUT',
      data => this.loadEmployees(), createEmployee);
  }

  public deleteEmployee(id: number) {
    this.httpRequest('https://employee.szut.dev/employees/' + id, 'DELETE',
      data => {
        this.dataService.employeeDetails = new Employee();
        this.loadEmployees()
      });
  }
}

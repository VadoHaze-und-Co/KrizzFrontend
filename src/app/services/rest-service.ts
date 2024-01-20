import {Employee} from "../rest-objects/employee";
import {Qualification} from "../rest-objects/qualification";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EmployeeQualification} from "../rest-objects/employee-qualification";
import {DataService} from "./data-service";
import {Token} from "../rest-objects/token";
import {CreateEmployee} from "../rest-objects/create-employee";

export class RestService {
  bearer = "";
  header: HttpHeaders | undefined;

  constructor(private http: HttpClient, public dataService: DataService) {
    this.loadToken(() => {
      this.loadQualifications();
      this.loadEmployees();
    });
  }

  private loadToken(run: () => void) {
    this.http.post<Token>('http://authproxy.szut.dev',
      `grant_type=password&client_id=employee-management-service&username=user&password=test`,
      {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}
    ).subscribe(token => {
      this.bearer = token.access_token!;
      this.header = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.bearer);
      run();
    });
  }

  private httpRequest(url: string, method: string, func: (data: any) => void, body?: any) {
    let option = { headers: this.header, body: body };
    this.http.request(method, url, option).subscribe(data => func(data));
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
        .filter(q => q.skill !== undefined)
        .sort((a, b) => a.skill!.localeCompare(b.skill!)!);
    });
  }

  public loadQualificationsForEmployee(employee: Employee, func?: () => void) {
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
      () => this.loadQualifications(),
      {skill: name});
  }

  public removeQualificationFromEmployee(qualificationName: string, employeeId: number, func?: () => void) {
    this.httpRequest('https://employee.szut.dev/employees/' + employeeId + '/qualifications', 'DELETE',
      () => {}, {skill: qualificationName});
  }

  // EMPLOYEE

  public createEmployee() {
    this.httpRequest('https://employee.szut.dev/employees/', 'POST',
      data => this.loadEmployees(),
      new CreateEmployee(this.dataService.creatingEmployee, this.dataService.selectedQualifications()));
  }

  public editEmployee() {
    this.httpRequest('https://employee.szut.dev/employees/' + this.dataService.editingEmployee.id!, 'PUT',
        data => this.loadEmployees(),
      new CreateEmployee(this.dataService.editingEmployee, this.dataService.selectedQualifications()));
  }

  public deleteEmployee(id: number) {
    this.httpRequest('https://employee.szut.dev/employees/' + id, 'DELETE',
        data => this.loadEmployees());
  }
}

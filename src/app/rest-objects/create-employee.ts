import {Employee} from "./employee";
import {Qualification} from "./qualification";

export class CreateEmployee {

  public lastName: string;
  public firstName: string;
  public street: string;
  public postcode: string;
  public city: string;
  public phone: string;
  public skillSet: number [];

  constructor(employee: Employee, qualifications: Qualification[]) {
    this.lastName = employee.lastName!;
    this.firstName = employee.firstName!;
    this.street = employee.street!;
    this.postcode = employee.postcode!;
    this.city = employee.city!;
    this.phone = employee.phone!;
    this.skillSet = qualifications.map(q => q.id!);
  }
}

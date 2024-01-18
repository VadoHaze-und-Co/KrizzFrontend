export class Employee {
  public skills: string[] = [];

  constructor(public id?: number,
              public lastName?: string,
              public firstName?: string,
              public street?: string,
              public postcode?: string,
              public city?: string,
              public phone?: string) {
  }

  public employeeFullName(): string  {
    let s = this.firstName + " " + this.lastName;
    if (s.length >= 28) {
      return s.substring(0, 27) + "...";
    }
    return s;
  }
}

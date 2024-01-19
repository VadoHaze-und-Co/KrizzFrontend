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

  public employeeFullName(len?: number): string {
    if (len === undefined) {
      len = 28;
    }
    let s = this.firstName + " " + this.lastName;
    if (len != -1) {
      if (s.length >= len) {
        return s.substring(0, len - 1) + "...";
      }
    }
    return s;
  }
}

export class Qualification {
  constructor(public skill: string = "", public id: number = -1) {
  }

  public clone() {
    return new Qualification(this.skill, this.id);
  }
}

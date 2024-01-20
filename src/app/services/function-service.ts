import {Qualification} from "../rest-objects/qualification";
import {DataService} from "./data-service";
import {RestService} from "./rest-service";
import {Injectable, NgModule} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [HttpClientModule],
  providers: [HttpClientModule]
})
@Injectable({ providedIn: "root" })
export class FunctionService {
  public restService: RestService;

  constructor(http: HttpClient, public dataService: DataService) {
    this.restService = new RestService(http, this.dataService);
  }

  public addQualification() {
    // TODO: error message
    let name = this.restService.dataService.addQualificationText;
    if (name.length == 0) {
      console.log("error: name cannot be empty")
      return;
    }
    if (this.restService.dataService.qualifications.filter(q => q.skill!.toLowerCase() == name.toLowerCase()).length >= 1) {
      console.log("error: name already exists")
      return;
    }
    this.restService.addQualification(name);
    this.restService.dataService.addQualificationText = this.restService.dataService.addQualificationText = "";
  }

  public deleteQualification(qualification: Qualification) {
    this.restService.dataService.employees.forEach(e => {
      this.restService.loadQualificationsForEmployee(e, () => {
        if (e.skills.includes(qualification.skill!)) {
          this.restService.removeQualificationFromEmployee(qualification.skill!, e.id!);
        }
      });
    });
    setTimeout(() => this.restService.deleteQualification(qualification.id!), 50);
  }

  public editQualification(qualification: Qualification) {
    // TODO: error message
    if (this.restService.dataService.qualificationEdit !== undefined) {
      console.log("You are already editing something")
      return;
    }
    this.restService.dataService.qualificationEdit = {name: qualification.skill!, id: qualification.id!};
  }

  public saveQualification() {
    this.restService.dataService.qualifications.filter(q => q.id == this.restService.dataService.qualificationEdit?.id).forEach(q => {
      let name = this.restService.dataService.qualificationEdit!.name;
      if (name != q.skill) {
        this.restService.editQualification(q.id!, name);
      }
    });
    this.restService.dataService.qualificationEdit = undefined;
  }
}

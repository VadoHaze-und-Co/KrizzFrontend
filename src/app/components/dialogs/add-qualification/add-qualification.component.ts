import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Dialog} from "../dialog";
import {RestService} from "../../../services/rest-service";
import {DataService} from "../../../services/data-service";

@Component({
  selector: 'app-add-qualification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-qualification.component.html',
  styleUrl: './add-qualification.component.css'
})
export class AddQualificationComponent extends Dialog {

  constructor(public override restService: RestService, public override dataService: DataService) {
    super(restService, dataService);
  }

  public submit() {
    this.restService.addQualification();
    this.close();
    //this.restService.fetchQualificationData();
  }
}

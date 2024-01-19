import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {Data} from "@angular/router";
import {DataService} from "../../services/data-service";
import {RestService} from "../../services/rest-service";
import {Employee} from "../../rest-objects/employee";

@Component({
  selector: 'app-add-qualification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-qualification.component.html',
  styleUrl: './add-qualification.component.css'
})
export class AddQualificationComponent {

  constructor(public dataService: DataService, public restService: RestService) {
  }

  public close() {
    this.dataService.createQualificationDialog = false;
  }

  clickInside = false;
  clickBackground() {
    if (!this.clickInside) {
      this.close();
    }
    this.clickInside = false;
  }
  clickForeground() {
    this.clickInside = true;
  }

  public add() {
    this.restService.addQualification();
    this.close();
    this.restService.fetchQualificationData();
  }
}

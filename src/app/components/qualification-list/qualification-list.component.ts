import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {RestService} from "../../services/rest-service";
import {DataService} from "../../services/data-service";
import {resolve} from "@angular/compiler-cli";
import {Qualification} from "../../rest-objects/qualification";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent {

  constructor(public restService: RestService, public dataService: DataService) {
    restService.fetchQualificationData();
  }

  public close() {
    this.dataService.qualificationListDialog = false;
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
}

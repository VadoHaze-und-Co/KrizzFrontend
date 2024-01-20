import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {RestService} from "../../../services/rest-service";
import {DataService} from "../../../services/data-service";
import {Dialog} from "../dialog";

@Component({
  selector: 'app-qualification-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './qualification-list.component.html',
  styleUrl: './qualification-list.component.css'
})
export class QualificationListComponent extends Dialog {

  constructor(public override restService: RestService, public override dataService: DataService) {
    super(restService, dataService);
    restService.fetchQualificationData();
  }
}

import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Qualification} from "../../rest-objects/qualification";
import {RestService} from "../../services/rest-service";
import {Observable, of} from "rxjs";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {DataService} from "../../services/data-service";

@Component({
  selector: 'app-qualification-card',
  standalone: true,
  imports: [CommonModule, RestService],
  templateUrl: './qualification-card.component.html',
  styleUrl: './qualification-card.component.css'
})
export class QualificationCardComponent {

  @Input() public selectable: boolean = false;
  @Input() public qualifications: string[] | undefined;

  constructor(public restService: RestService, public dataService: DataService) {
    restService.fetchQualificationData(() => this.qualifications = dataService.qualifications.filter(q => q.skill !== undefined).map(q => q.skill!));
  }

  protected readonly dateTimestampProvider = dateTimestampProvider;
}

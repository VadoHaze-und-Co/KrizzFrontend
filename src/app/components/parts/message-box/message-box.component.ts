import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DataService} from "../../../services/data-service";

@Component({
  selector: 'app-message-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-box.component.html',
  styleUrl: './message-box.component.css'
})
export class MessageBoxComponent {

  constructor(public dataService: DataService) {
  }

  protected readonly DataService = DataService;
}

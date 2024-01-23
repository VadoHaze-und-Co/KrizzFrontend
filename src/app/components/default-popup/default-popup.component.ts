import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-default-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './default-popup.component.html',
  styleUrl: './default-popup.component.css'
})
export class DefaultPopupComponent {
  @Input() employeeData: any;
  @Output() closeForm = new EventEmitter<void>();

  handleEditClick() {
    // Hier können Sie die Logik für den Bearbeitungsmodus hinzufügen
  }
}

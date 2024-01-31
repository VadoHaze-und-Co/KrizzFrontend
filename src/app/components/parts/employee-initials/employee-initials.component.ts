import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Employee} from "../../../rest-objects/employee";

@Component({
  selector: 'app-employee-initials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-initials.component.html',
  styleUrls: [
    './employee-initials.component.css',
    '/src/app/main.css'
  ]
})
export class EmployeeInitialsComponent {

  public colors = [
    "#f29985",
    "#923f98",
    "#487ba6",
    "#bd85a4",
    "#328fb1",
    "#c44545",
    "#d6e286",
    "#08b476",
    "#4177a6",
    "#3b7e56",
    "#8d9df5",
    "#6868dc",
    "#f17456",
    "#6d5e78",
  ];

  @Input() employee: Employee | undefined;
  @Input() size: number = 1;

  public initials(): string {
    if (this.employee === undefined) {
      return "";
    }
    return (this.employee.firstName.charAt(0)! + this.employee.lastName.charAt(0)!).toUpperCase();
  }

  public get color() {
    let initials = ((this.employee!.firstName.toLowerCase().charCodeAt(0)! << 9) + this.employee!.lastName.toLowerCase().charCodeAt(0)!) % this.colors.length;
    return this.colors[initials];
  }
}

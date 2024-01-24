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
    "#487ba6",
    "#7acb99",
    "#bd85a4",
    "#328fb1",
    "#d6e286",
    "#8d9df5",
    "#bbd687",
    "#6868dc",
    "#9fcfe1",
    "#08b476",
    "#4177a6",
    "#f27877",
    "#f17456",
    "#f2c6a1",
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
    let initials = (this.employee!.firstName.toLowerCase().charCodeAt(0)! + this.employee!.lastName.toLowerCase().charCodeAt(0)!) % this.colors.length;
    console.log(initials)
    return this.colors[initials];
  }
}

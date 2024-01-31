import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataService} from "../../services/data-service";
import {FunctionService} from "../../services/function-service";
import {HttpHeaders} from "@angular/common/http";
import {catchError, EMPTY} from "rxjs";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: [
    './login-page.component.css',
    '/src/app/main.css'
  ]
})
export class LoginPageComponent {

  public static LOGIN_MESSAGE: {message: string, color: string} = {message: "Login", color: "darkgray"};
  public message: {message: string, color: string} = LoginPageComponent.LOGIN_MESSAGE;

  constructor(public dataService: DataService, public functionService: FunctionService) {
  }

  async login() {
    await this.functionService.restService.loadToken(this.dataService.loginUsername, this.dataService.loginPassword)
      .pipe(catchError(error => {
        if (error.status == 400) {
          this.message = {message: "Die Daten sind falsch", color: "red"};
          setTimeout(() => this.message = LoginPageComponent.LOGIN_MESSAGE, 2300);
        }
        return EMPTY;
      })).forEach(token => {
        let bearer = token.access_token!;
        localStorage.setItem("token", bearer);
        this.functionService.restService.createHeader(bearer);
      });
  }
}

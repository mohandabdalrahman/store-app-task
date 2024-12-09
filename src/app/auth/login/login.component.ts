import { Component } from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    FormsModule,
    TranslatePipe,
    MatInput,
    MatButton,
    NgIf,
    MatLabel,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatIcon,
    MatCardTitle
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.authService.login(this.username, this.password)) {
      const role = this.authService.getRole();
      this.router.navigate([role === 'admin' ? '/admin' : '/user']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
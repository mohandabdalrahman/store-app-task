import { Component, inject } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {Router, RouterLink} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {AuthService} from "../../auth/auth.service";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";

import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    RouterLink,
    MatButton,
    MatIconButton,
    TranslatePipe,
    MatIcon,
    MatTooltip,
    MatFormField,
    MatSelect,
    MatOption,
    MatLabel
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private translateService = inject(TranslateService);

  role: string | null = null;
  selectedLanguage: string = 'en';

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.selectedLanguage = this.translateService.currentLang || 'en';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  switchLanguage(lang: string): void {
    this.translateService.use(lang);
    this.selectedLanguage = lang;
  }
}

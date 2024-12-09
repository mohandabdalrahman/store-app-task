import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatToolbar,
    TranslatePipe
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}

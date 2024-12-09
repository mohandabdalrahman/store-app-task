import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslations } from './translation.config';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(), // Ensure HttpClient is provided
    provideTranslations
  ]
};

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { TranslateService } from '@ngx-translate/core';

bootstrapApplication(AppComponent, appConfig).then(appRef => {
  const translate = appRef.injector.get(TranslateService);
  translate.setDefaultLang('en');
  translate.use('en'); // Set the initial language to English
});

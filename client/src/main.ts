import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
});

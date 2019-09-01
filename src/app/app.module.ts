import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faLongArrowAltRight,
         faBriefcaseMedical,
         faGraduationCap,
         faCapsules } from '@fortawesome/free-solid-svg-icons';
import { faLinkedinIn,
         faGithubAlt,
         faCodepen } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    [faLongArrowAltRight, faBriefcaseMedical, faGraduationCap,
     faCapsules, faLinkedinIn, faGithubAlt, faCodepen].forEach(icon => {
      library.add(icon);
    });
  }
}

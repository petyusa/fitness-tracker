import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth/auth.service';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { HeaderComponent } from './navigation/header/header.component';
import { LoginComponent } from './auth/login/login.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { StopTrainingComponent } from './training/current-training/stop-training.component';
import { TrainingComponent } from './training/training.component';
import { TrainingService } from './training/training.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CurrentTrainingComponent,
    LoginComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    SignupComponent,
    TrainingComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StopTrainingComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, TrainingService],
  bootstrap: [AppComponent],
  entryComponents: [StopTrainingComponent]
})
export class AppModule {}

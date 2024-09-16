// src/app/app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.page'; // Ensure this import points to the correct location
import { FormsModule } from '@angular/forms'; // Add FormsModule if using ngModel in templates
import { RegisterComponent } from './register/register.component';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, Tab1Page, Tab2Page, UpdateProfileComponent], // Ensure LoginComponent is correctly declared
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Use IonicModule.forRoot to set up Ionic app defaults
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // Initialize Firebase with environment config
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule, // Import FormsModule if using ngModel
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allow Ionic Web Components
  bootstrap: [AppComponent],
})
export class AppModule {}

// src/app/app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.page'; // Ensure this import points to the correct location
import { FormsModule } from '@angular/forms'; // Add FormsModule if using ngModel in templates
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent], // Ensure LoginComponent is correctly declared
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Use IonicModule.forRoot to set up Ionic app defaults
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // Initialize Firebase with environment config
    AngularFireAuthModule,
    FormsModule, // Import FormsModule if using ngModel
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Allow Ionic Web Components
  bootstrap: [AppComponent],
})
export class AppModule {}

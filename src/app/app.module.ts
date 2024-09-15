import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.page'; // Ensure correct import

@NgModule({
  declarations: [AppComponent, LoginComponent], // Add LoginComponent here
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Configure IonicModule
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this to support Ionic elements
  bootstrap: [AppComponent]
})
export class AppModule {}

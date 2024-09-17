// src/app/app.module.ts

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

// Component Imports
import { LoginComponent } from './login/login.page';
import { RegisterComponent } from './register/register.component';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { SubscribePage } from './subscribe/subscribe.component';
import { LessonsPage } from './lessons/lessons.page';
import { LessonDashboardComponent } from './lesson-dashboard/lesson-dashboard.component';
import { AudioManagerComponent } from './manager/audio-manager/audio-manager.component';
import { VideoManagerComponent } from './manager/video-manager/video-manager.component';
import { TaskManagerComponent } from './manager/task-manager/task-manager.component';
import { MaterialManagerComponent } from './manager/material-manager/material-manager.component';
import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';

// Correct Import Path
import { customTabAnimation } from './animations/custom-tab-transition';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    Tab1Page,
    Tab2Page,
    UpdateProfileComponent,
    SubscribePage,
    LessonsPage,
    LessonDashboardComponent,
    AudioManagerComponent,
    VideoManagerComponent,
    TaskManagerComponent,
    MaterialManagerComponent,
    FeedbackFormComponent,
    FeedbackListComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      animated: true, // Enable animations
      navAnimation: customTabAnimation, // Use the custom animation function
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}

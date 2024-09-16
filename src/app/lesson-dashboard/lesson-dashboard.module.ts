// src/app/lesson-dashboard/lesson-dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LessonDashboardComponent } from './lesson-dashboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LessonDashboardComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes), // Configure the routes for lazy loading
  ],
  exports: [],
})
export class LessonDashboardModule {}

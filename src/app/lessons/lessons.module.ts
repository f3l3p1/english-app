// src/app/lessons/lessons.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LessonsPageRoutingModule } from './lessons-routing.module';
import { LessonsPage } from './lessons.page';  // Correct import statement

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LessonsPageRoutingModule
  ],
  declarations: [],  // Ensure the component is declared here
  exports: []  // Exporting the component if needed elsewhere
})
export class LessonsPageModule {}

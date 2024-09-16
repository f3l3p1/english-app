// src/app/manager/audio-manager/audio-manager.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { AudioManagerComponent } from './audio-manager.component';

// Define routes for the module
const routes: Routes = [
  {
    path: '',
    component: AudioManagerComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes) // Set up lazy loading with RouterModule.forChild
  ]
})
export class AudioManagerModule {}

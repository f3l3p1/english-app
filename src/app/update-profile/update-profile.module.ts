// src/app/update-profile/update-profile.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { UpdateProfileComponent } from './update-profile.component'; // Import the component

const routes: Routes = [
  {
    path: '',
    component: UpdateProfileComponent, // Set as route component
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes) // Use forChild for lazy-loaded modules
  ]
})
export class UpdateProfileModule {}

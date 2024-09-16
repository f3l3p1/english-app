// src/app/tab1/tab1.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
// Import other necessary modules

const routes: Routes = [
  {
    path: '',
    component: Tab1Page, // Ensure routing is correct
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes), // Use forChild for child routes
  ],
  // Remove Tab1Page from declarations here
})
export class Tab1PageModule {}

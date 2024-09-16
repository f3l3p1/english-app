// src/app/subscribe/subscribe.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';

import { SubscribePage } from './subscribe.component';

const routes: Routes = [
  {
    path: '',
    component: SubscribePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes) // Set up routing for SubscribePage
  ],
  declarations: [] // Declare SubscribePage component
})
export class SubscribePageModule {}

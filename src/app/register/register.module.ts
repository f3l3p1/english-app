import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component'; // Import it only for routing, not declaration

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent, // Keep the component in the route definition
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes), // Use RouterModule.forChild for lazy loading
  ]
})
export class RegisterModule {}

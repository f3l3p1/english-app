// login-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.page'; // Import your component

const routes: Routes = [
  {
    path: '',
    component: LoginComponent, // Ensure the correct component is set for the route
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Use forChild here
  exports: [RouterModule],
})
export class LoginRoutingModule {}

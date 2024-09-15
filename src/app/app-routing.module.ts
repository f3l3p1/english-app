// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule), // Correct module name
  },
  // other routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use forRoot here
  exports: [RouterModule],
})
export class AppRoutingModule {}

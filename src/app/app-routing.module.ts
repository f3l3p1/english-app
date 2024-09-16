// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
  },
  {
    path: 'update-profile', // Add this route for the update profile component
    loadChildren: () => import('./update-profile/update-profile.module').then(m => m.UpdateProfileModule),
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  { 
    path: '**', 
    redirectTo: '/login' 
  } // Handle 404 with a wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Use forRoot in the main app routing module
  exports: [RouterModule],
})
export class AppRoutingModule {}

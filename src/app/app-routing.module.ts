// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LessonDashboardComponent } from './lesson-dashboard/lesson-dashboard.component';

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
    path: 'subscribe/:id',
    loadChildren: () => import('./subscribe/subscribe.module').then(m => m.SubscribePageModule),
  },
  {
    path: 'lessons/:id',
    loadChildren: () => import('./lessons/lessons.module').then(m => m.LessonsPageModule),
  },
  {
    path: 'lesson-dashboard/:lessonId',  // Define the path to include lessonId as a parameter
    component: LessonDashboardComponent,
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./update-profile/update-profile.module').then(m => m.UpdateProfileModule),
  },
  {
    path: 'audio-manager/:lessonId',  // Add the :lessonId parameter
    loadChildren: () => import('./manager/audio-manager/audio-manager.module').then(m => m.AudioManagerModule),
  },
  {
    path: 'video-manager',
    loadChildren: () => import('./manager/video-manager/video-manager.module').then(m => m.VideoManagerModule),
  },
  {
    path: 'task-manager',
    loadChildren: () => import('./manager/task-manager/task-manager.module').then(m => m.TaskManagerModule),
  },
  {
    path: 'material-manager',
    loadChildren: () => import('./manager/material-manager/material-manager.module').then(m => m.MaterialManagerModule),
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

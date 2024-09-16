// src/app/tab2/tab2.page.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  user$: Observable<User | null>;

  currentCourse = {
    title: 'New Comers',
    description: 'Primera etapa donde podrás comenzar mejorando tu vocabulario',
    image: 'assets/images/newcomers.webp',
    progress: 50 // Example progress
  };

  recentSessions = [
    { title: 'Casual Conversation', sessionNumber: 1 },
    { title: 'Special Topic', sessionNumber: 1 },
    { title: 'Daily Routine', sessionNumber: 1 },
    { title: 'Go Shopping', sessionNumber: 1 },
  ];

  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {}

  // Navigate to the update profile component
  goToUpdateProfile() {
    this.router.navigate(['/update-profile']);
  }
}

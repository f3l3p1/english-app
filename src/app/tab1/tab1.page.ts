// src/app/tab1/tab1.page.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service'; // Ensure the path is correct
import { FirestoreService } from 'src/service/firestore.service'; // Import FirestoreService
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  user$: Observable<User | null>; // Observable for the current user
  stats: any = { clasesCompletadas: 0, tareasCompletadas: 0, logros: 0 }; // Default stats values

  courses = [
    { id: 1, title: 'New Comers', image: 'assets/images/newcomers.webp' },
    { id: 2, title: 'Novices', image: 'assets/images/novices.jpg' },
    { id: 3, title: 'Skilled', image: 'assets/images/skilled.webp' },
    { id: 4, title: 'Transitionals', image: 'assets/images/transitionals.jpg' }
  ];

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService, // Inject FirestoreService
    private router: Router
  ) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    // Fetch the user stats dynamically
    this.user$.subscribe(user => {
      if (user) {
        const userId = user.uid;
        this.firestoreService.getUserStats(userId).subscribe(stats => this.stats = stats);
      }
    });
  }

  // Navigate to the update profile component
  goToUpdateProfile() {
    this.router.navigate(['/update-profile']);
  }

  // Navigate to Tab3
  goToTab3() {
    this.router.navigate(['/tabs/tab3']);
  }

  // Navigate to the subscribe page of the selected course
  goToSubscribe(courseId: number) {
    this.router.navigate(['/subscribe', courseId]);
  }
}

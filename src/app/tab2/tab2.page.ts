// src/app/tab2/tab2.page.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { FirestoreService } from 'src/service/firestore.service';
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
  stats: any = { clasesCompletadas: 0, tareasCompletadas: 0, logros: 0 }; // Default stats values
  currentCourse: any = null; // Initialize with null or default course object
  recentSessions: any[] = []; // Initialize as empty array

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    // Subscribe to user observable to get the user ID and fetch data
    this.user$.subscribe(user => {
      if (user) {
        const userId = user.uid; // Get the user's ID
        
        // Fetch stats, current course, and recent sessions using the user ID
        this.firestoreService.getUserStats(userId).subscribe(stats => this.stats = stats);
        this.firestoreService.getCurrentCourse(userId).subscribe(course => this.currentCourse = course);
        this.firestoreService.getRecentSessions(userId).subscribe(sessions => this.recentSessions = sessions);
      }
    });
  }

  // Navigate to the update profile component
  goToUpdateProfile() {
    this.router.navigate(['/update-profile']);
  }
}

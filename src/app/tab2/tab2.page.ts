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
  stats: any = { clasesCompletadas: 0, tareasCompletadas: 0, logros: 0 };
  currentCourse: any = null;
  recentSessions: any[] = [];
  userRole: string | null = null; // Added to store user role
  feedbacks: any[] = []; // Store feedbacks for students

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        const userId = user.uid;

        // Fetch user-specific data
        this.firestoreService.getUserStats(userId).subscribe(stats => this.stats = stats);
        this.firestoreService.getCurrentCourse(userId).subscribe(course => this.currentCourse = course);
        this.firestoreService.getRecentSessions(userId).subscribe(sessions => this.recentSessions = sessions);

        // Fetch user role
        this.firestoreService.getUserRole(userId).subscribe(role => {
          this.userRole = role;
          if (role === 'student') {
            this.loadFeedbacks(userId); // Load feedbacks for students
          }
        });
      }
    });
  }

  // Navigate to the update profile component
  goToUpdateProfile() {
    this.router.navigate(['/update-profile']);
  }

  goToLessons(courseId: string, courseName: string) {
    this.router.navigate(['/lessons', courseId, { courseName }]);
  }

  // Load feedbacks for students
  loadFeedbacks(userId: string) {
    this.firestoreService.getFeedbacksForStudent(userId).subscribe(feedbacks => this.feedbacks = feedbacks);
  }

  // Navigate to feedback creation page (for teachers)
  giveFeedback() {
    this.router.navigate(['/give-feedback']);
  }
}

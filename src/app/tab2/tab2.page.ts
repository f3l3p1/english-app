// src/app/tab2/tab2.page.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { FirestoreService } from 'src/service/firestore.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'firebase/auth';

interface Stats {
  clasesCompletadas: number;
  tareasCompletadas: number;
  logros: number;
}

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  user$: Observable<User | null>;
  stats$: Observable<Stats>; // Correctly type as observable
  currentCourse: any = null;
  recentSessions: any[] = [];
  userRole: string | null = null;
  feedbacks: any[] = [];

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router
  ) {
    this.user$ = this.authService.currentUser$;
    this.stats$ = of({ clasesCompletadas: 0, tareasCompletadas: 0, logros: 0 }); // Initial value
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        const userId = user.uid;

        // Fetch stats as an observable for real-time updates
        this.stats$ = this.firestoreService.getUserStats(userId);
        this.firestoreService.getCurrentCourse(userId).subscribe(course => this.currentCourse = course);
        this.firestoreService.getRecentSessions(userId).subscribe(sessions => this.recentSessions = sessions);

        this.firestoreService.getUserRole(userId).subscribe(role => {
          this.userRole = role;
          if (role === 'student') {
            this.loadFeedbacks(userId);
          }
        });
      }
    });
  }

  loadFeedbacks(userId: string) {
    this.firestoreService.getFeedbacksForStudent(userId).subscribe(feedbacks => {
      this.feedbacks = feedbacks.map(feedback => ({
        ...feedback,
        showDescription: false  // Initialize showDescription for toggling
      }));
    });
  }

  toggleFeedbackDescription(feedback: any) {
    feedback.showDescription = !feedback.showDescription; // Toggle description visibility
  }

  goToUpdateProfile() {
    this.router.navigate(['/update-profile']);
  }

  goToLessons(courseId: string, courseName: string) {
    this.router.navigate(['/lessons', courseId, { courseName }]);
  }

  giveFeedback() {
    this.router.navigate(['/give-feedback']);
  }
}

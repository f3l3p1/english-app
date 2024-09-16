// src/app/subscribe/subscribe.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/service/firestore.service'; // Import FirestoreService
import { AuthService } from 'src/service/auth.service'; // Import AuthService to get current user

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribePage implements OnInit {
  course: any;
  userId: string | null = null; // Store the current user's ID

  courses = [
    { id: 1, title: 'New Comers', description: 'Primera etapa donde podrás comenzar mejorando tu vocabulario', image: 'assets/images/newcomers.webp' },
    { id: 2, title: 'Novices', description: 'Segunda etapa que consta de tres pasos...', image: 'assets/images/novices.jpg' },
    { id: 3, title: 'Transitionals', description: 'Tercera etapa que consta de tres pasos...', image: 'assets/images/transitionals.jpg' },
    { id: 4, title: 'Skilled', description: 'Cuarta Etapa, para personas que deseen especializar...', image: 'assets/images/skilled.webp' }
  ];

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private firestoreService: FirestoreService, // Inject FirestoreService
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit() {
    const courseId = +this.route.snapshot.paramMap.get('id')!;
    this.course = this.courses.find(course => course.id === courseId);

    // Get the current user's ID
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  // Method to navigate to the lessons page with courseId and courseName
  viewLessons(courseId: number, courseName: string) {
    this.router.navigate(['/lessons', courseId, { courseName }]);
  }

  // Method to navigate back to Tab3 page
  cancel() {
    this.router.navigate(['/tabs/tab3']);
  }

  // Method to subscribe and then navigate to lessons
  subscribe() {
    if (!this.userId) {
      alert('User not logged in!');
      return;
    }

    // Check the user's current progress before subscribing
    this.firestoreService.getUserStats(this.userId).subscribe(stats => {
      // Check if the current course is New Comers or if prerequisites are met
      if (this.course.id === 1 || this.isEligibleForNextCourse(stats)) {
        // Assign the selected course to the user
        this.firestoreService.assignCourse(this.userId!, this.course).then(() => {
          alert(`Subscribed to ${this.course.title}`);
          // Navigate directly to the lessons page after subscribing with both courseId and courseName
          this.viewLessons(this.course.id, this.course.title);
        }).catch(error => {
          console.error('Error subscribing to course:', error);
          alert('Failed to subscribe to the course. Please try again.');
        });
      } else {
        alert('You need to complete all lessons of the previous course before subscribing to this one.');
      }
    });
  }

  // Helper function to check if the user can subscribe to the next course
  isEligibleForNextCourse(stats: { clasesCompletadas: number }): boolean {
    // Define required lessons completed for each course
    const requiredLessons: { [key: number]: number } = {
      1: 0,   // New Comers can be subscribed without any prerequisites
      2: 10,  // Number of lessons completed required to unlock Novices
      3: 20,  // Required for Transitionals
      4: 30   // Required for Skilled
    };

    // Check if the user's completed lessons meet the requirement for the current course
    // Use type assertion to cast this.course.id to a key type compatible with requiredLessons
    return stats.clasesCompletadas >= requiredLessons[this.course.id as keyof typeof requiredLessons];
  }
}

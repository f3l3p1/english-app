import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/service/firestore.service'; 
import { AuthService } from 'src/service/auth.service'; 
import { CurrentCourse } from 'src/models/course.model'; // Correct import path

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribePage implements OnInit {
  course: CurrentCourse | undefined;
  userId: string | null = null;

  courses: CurrentCourse[] = [
    { id: '1', title: 'New Comers', description: 'Primera etapa donde podrás comenzar mejorando tu vocabulario', image: 'assets/images/newcomers.webp' },
    { id: '2', title: 'Novices', description: 'Segunda etapa que consta de tres pasos...', image: 'assets/images/novices.jpg' },
    { id: '3', title: 'Transitionals', description: 'Tercera etapa que consta de tres pasos...', image: 'assets/images/transitionals.jpg' },
    { id: '4', title: 'Skilled', description: 'Cuarta Etapa, para personas que deseen especializar...', image: 'assets/images/skilled.webp' }
  ];

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private firestoreService: FirestoreService, 
    private authService: AuthService 
  ) {}

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (!courseId) {
      console.error('Course ID is null');
      return; // Handle null case if necessary
    }
    this.course = this.courses.find(course => course.id === courseId);

    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.checkSubscriptionStatus();
      }
    });
  }

  checkSubscriptionStatus() {
    if (!this.userId || !this.course) return;

    this.firestoreService.getCurrentCourse(this.userId).subscribe(currentCourse => {
      if (currentCourse && this.course && currentCourse.id === this.course.id) {
        this.viewLessons(this.course.id, this.course.title);
      }
    });
  }

  viewLessons(courseId: string, courseName: string) {
    this.router.navigate(['/lessons', courseId, { courseName }]);
  }

  cancel() {
    this.router.navigate(['/tabs/tab3']);
  }

  subscribe() {
    if (!this.userId || !this.course) {
      alert('User not logged in or course not found!');
      return;
    }

    this.firestoreService.getUserStats(this.userId).subscribe(stats => {
      if (this.course && (this.course.id === '1' || this.isEligibleForNextCourse(stats))) {
        this.firestoreService.assignCourse(this.userId!, this.course!).then(() => {
          alert(`Subscribed to ${this.course?.title}`);
          this.viewLessons(this.course?.id!, this.course?.title!);
        }).catch((error: any) => { 
          console.error('Error subscribing to course:', error);
          alert('Failed to subscribe to the course. Please try again.');
        });
      } else {
        alert('You need to complete all lessons of the previous course before subscribing to this one.');
      }
    });
  }

  isEligibleForNextCourse(stats: { clasesCompletadas: number }): boolean {
    const requiredLessons: { [key: string]: number } = {
      '1': 0,   // New Comers can be subscribed without any prerequisites
      '2': 10,  // Number of lessons completed required to unlock Novices
      '3': 20,  // Required for Transitionals
      '4': 30   // Required for Skilled
    };

    return stats.clasesCompletadas >= requiredLessons[this.course?.id!];
  }
}

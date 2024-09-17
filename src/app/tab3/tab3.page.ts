// src/app/tab3/tab3.page.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/service/firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  courses = [
    { id: 1, title: 'New Comers', description: 'Primera etapa donde podrás comenzar mejorando tu vocabulario', image: 'assets/images/newcomers.webp' },
    { id: 2, title: 'Novices', description: 'Segunda etapa que consta de tres pasos...', image: 'assets/images/novices.jpg' },
    { id: 3, title: 'Transitionals', description: 'Tercera etapa que consta de tres pasos...', image: 'assets/images/transitionals.jpg' },
    { id: 4, title: 'Skilled', description: 'Cuarta Etapa, para personas que deseen especializar...', image: 'assets/images/skilled.webp' }
  ];

  userRole$!: Observable<string | null>;
  isTeacher = false;

  constructor(private router: Router, private firestoreService: FirestoreService) {}

  ngOnInit() {
    // Fetch the user's role to determine access
    this.userRole$ = this.firestoreService.getUserRole('current-user-id'); // Replace with actual user ID
    this.userRole$.subscribe(role => {
      this.isTeacher = role === 'teacher';
      console.log('User role in Tab3:', role, 'Is teacher:', this.isTeacher); // Debugging line
    });
  }

  goToUpdateProfile() {
    this.router.navigate(['/update-profile']);
  }

  viewMore(courseId: number) {
    if (this.isTeacher) {
      // Skip subscription and go directly to lessons
      this.router.navigate(['/lessons', courseId]);
    } else {
      // Navigate to subscription page for students
      this.router.navigate(['/subscribe', courseId]);
    }
  }
}

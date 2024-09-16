// src/app/tab3/tab3.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit() {}

  goToUpdateProfile() {
    this.router.navigate(['/update-profile']);
  }

  viewMore(courseId: number) {
    console.log(`View more details for course ID: ${courseId}`);
    // Implement navigation to course details if necessary
  }
}

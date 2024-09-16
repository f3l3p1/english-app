// src/app/subscribe/subscribe.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribePage implements OnInit {
  course: any;

  courses = [
    { id: 1, title: 'New Comers', description: 'Primera etapa donde podrás comenzar mejorando tu vocabulario', image: 'assets/images/newcomers.webp' },
    { id: 2, title: 'Novices', description: 'Segunda etapa que consta de tres pasos...', image: 'assets/images/novices.jpg' },
    { id: 3, title: 'Transitionals', description: 'Tercera etapa que consta de tres pasos...', image: 'assets/images/transitionals.jpg' },
    { id: 4, title: 'Skilled', description: 'Cuarta Etapa, para personas que deseen especializar...', image: 'assets/images/skilled.webp' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const courseId = +this.route.snapshot.paramMap.get('id')!;
    this.course = this.courses.find(course => course.id === courseId);
  }

  cancel() {
    this.router.navigate(['/tabs/tab3']);
  }

  subscribe() {
    alert(`Subscribed to ${this.course.title}`);
  }
}
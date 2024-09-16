// src/app/lessons/lessons.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.page.html',
  styleUrls: ['./lessons.page.scss'],
})
export class LessonsPage implements OnInit {
  lessons = [
    { level: 1, title: 'Daily Routines' },
    { level: 1, title: 'Go Shopping' },
    { level: 1, title: 'Special Topic' },
    { level: 1, title: 'Casual Conversation' },
    { level: 1, title: 'Present Continuous I' },
    { level: 1, title: 'Present Simple I' },
    { level: 2, title: 'Do / Does' },
    { level: 2, title: 'Job Interview' }
  ];
  
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    // Fetch lessons based on courseId if necessary
  }

  goToUpdateProfile() {
    this.router.navigate(['/update-profile']);
  }
}

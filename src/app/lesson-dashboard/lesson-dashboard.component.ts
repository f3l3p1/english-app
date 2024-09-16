import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lesson-dashboard',
  templateUrl: './lesson-dashboard.component.html',
  styleUrls: ['./lesson-dashboard.component.scss'],
})
export class LessonDashboardComponent implements OnInit {
  lessonTitle: string = ''; // Initialize with a default value

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.lessonTitle = this.route.snapshot.queryParamMap.get('title') || 'Lesson Dashboard';
  }

  navigateTo(section: string) {
    switch (section) {
      case 'online':
        alert('Online sessions coming soon!');
        break;
      case 'audio':
        alert('Audio content');
        break;
      case 'video':
        alert('Video content');
        break;
      case 'tasks':
        alert('Tasks section');
        break;
      default:
        break;
    }
  }

  goToSettings() {
    this.router.navigate(['/update-profile']);
  }

  // Add this method for back navigation
  goBackToLessons() {
    this.router.navigate(['/lessons']); // Adjust path if needed
  }
}

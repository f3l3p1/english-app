import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-lesson-dashboard',
  templateUrl: './lesson-dashboard.component.html',
  styleUrls: ['./lesson-dashboard.component.scss'],
})
export class LessonDashboardComponent implements OnInit {

  lessonTitle: string = ''; 
  lessonId: string | null = null;
  isAuthenticated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Check for authentication state
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      if (!this.isAuthenticated) {
        this.router.navigate(['/login']);
      } else {
        // Set lesson ID and title if authenticated
        this.lessonTitle = this.route.snapshot.queryParamMap.get('title') || 'Lesson Dashboard';
        this.lessonId = this.route.snapshot.paramMap.get('lessonId');
        if (!this.lessonId) {
          alert('Lesson ID is missing!');
          this.router.navigate(['/lessons']); // Navigate back if lesson ID is missing
        } else {
          // Proceed with using the lessonId for fetching relevant data
          console.log('Lesson ID:', this.lessonId);        }
      }
    });
  }

  navigateTo(section: string) {
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return;
    }
  
    switch (section) {
      case 'audio':
        if (this.lessonId) {
          this.router.navigate(['/audio-manager', this.lessonId]); // Pass lessonId correctly
        } else {
          alert('Lesson ID is missing!');
        }
        break;
      case 'video':
        this.router.navigate(['/video-manager']);
        break;
      case 'tasks':
        this.router.navigate(['/task-manager']);
        break;
      case 'materials':
        this.router.navigate(['/material-manager']);
        break;
      default:
        alert('Invalid section!');
        break;
    }
  }  

  goToSettings() {
    this.router.navigate(['/update-profile']);
  }

  goBackToLessons() {
    this.router.navigate(['/lessons']);
  }
}

// src/app/lesson-dashboard/lesson-dashboard.component.ts

import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/service/firestore.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson-dashboard',
  templateUrl: './lesson-dashboard.component.html',
  styleUrls: ['./lesson-dashboard.component.scss']
})
export class LessonDashboardComponent implements OnInit, OnDestroy {
  lessonId!: string;
  lessonTitle!: string;
  userRole$!: Observable<string | null>;
  isTeacher = false;
  audios$!: Observable<any[]>;
  videos$!: Observable<any[]>;
  tasks$!: Observable<any[]>;
  materials$!: Observable<any[]>;
  private subscriptions: Subscription = new Subscription();

  @ViewChild('audioInput') audioInput!: ElementRef<HTMLInputElement>;
  @ViewChild('videoInput') videoInput!: ElementRef<HTMLInputElement>;
  @ViewChild('taskInput') taskInput!: ElementRef<HTMLInputElement>;
  @ViewChild('materialInput') materialInput!: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private router: Router,
    private cdr: ChangeDetectorRef  // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.lessonId = params.get('lessonId') || '';
      this.lessonTitle = this.route.snapshot.queryParamMap.get('title') || 'Lesson Title';

      if (!this.lessonId) {
        console.error('Lesson ID is missing or invalid.');
        this.router.navigate(['/lessons']);
        return;
      }

      // Fetch the user's role to determine access
      this.userRole$ = this.firestoreService.getUserRole('current-user-id'); // Replace with actual user ID
      this.subscriptions.add(
        this.userRole$.subscribe(role => {
          this.isTeacher = role === 'teacher';
          console.log('User role:', role, 'Is teacher:', this.isTeacher); // Debugging line
          this.cdr.detectChanges();  // Ensure the UI updates when role changes
        })
      );

      // Fetch files for the lesson
      this.refreshFiles();
    });
  }

  openOnlineSession() {
    alert('Online Session feature coming soon!');
  }

  onFileSelected(event: any, type: 'audios' | 'videos' | 'tasks' | 'materials') {
    console.log('File selected:', event, 'Type:', type); // Debugging line
    const file = event.target.files[0];
    if (file && this.isTeacher) {
      this.firestoreService.uploadFile(this.lessonId, file, type)
        .then(() => {
          console.log(`${type} uploaded successfully.`);
          this.refreshFiles();
        })
        .catch(error => {
          console.error(`Error uploading ${type}:`, error);
        });
    }
  }

  viewFiles(type: 'audios' | 'videos' | 'tasks' | 'materials') {
    console.log(`Viewing ${type}`);
    // Implement viewing logic as needed
  }

  refreshFiles() {
    this.audios$ = this.firestoreService.getFiles(this.lessonId, 'audios');
    this.videos$ = this.firestoreService.getFiles(this.lessonId, 'videos');
    this.tasks$ = this.firestoreService.getFiles(this.lessonId, 'tasks');
    this.materials$ = this.firestoreService.getFiles(this.lessonId, 'materials');
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe(); // Ensure we clean up subscriptions
  }
}

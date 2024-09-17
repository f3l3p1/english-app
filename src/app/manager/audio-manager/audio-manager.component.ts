// src/app/manager/audio-manager/audio-manager.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/service/firestore.service';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-audio-manager',
  templateUrl: './audio-manager.component.html',
  styleUrls: ['./audio-manager.component.scss'],
})
export class AudioManagerComponent implements OnInit {
  audios: any[] = [];
  lessonId: string = 'Mp2ylhkhDYHMdOBFNxwp'; // Use a common lessonId for all lessons
  lessonTitle: string | null = null;  // Used to filter specific lessons within the audios subcollection
  isAuthenticated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to the current user's authentication status
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user; // True if user exists, false otherwise
      if (!this.isAuthenticated) {
        // Redirect to login if not authenticated
        this.router.navigate(['/login']);
      } else {
        // Fetch lesson title from route parameters
        this.lessonTitle = this.route.snapshot.queryParamMap.get('title');
        console.log('Fetched Lesson Title:', this.lessonTitle);  // Debug log to verify the title
        if (this.lessonTitle) {
          this.loadAudios(this.lessonId, this.lessonTitle); // Pass both lessonId and lessonIdentifier
        } else {
          console.error('Lesson Title not found in route parameters.');
          this.router.navigate(['/lessons']);  // Redirect if lesson title is missing
        }
      }
    });
  }

  // Load audios for a specific lesson from Firestore
  loadAudios(lessonId: string, lessonTitle: string) { // Accept both lessonId and lessonIdentifier
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']); // Double-check to prevent unauthorized access
      return;
    }

    // Fetch audios using Firestore service with both parameters
    this.firestoreService.getAudios(lessonId, lessonTitle).subscribe(
      (audios: any[]) => {
        console.log('Fetched audios:', audios);  // Log fetched data
        if (audios.length > 0) {
          this.audios = audios;
        } else {
          console.log('No audios available for this lesson.');
        }
      },
      (error: any) => {
        console.error('Error fetching audios:', error);
      }
    );
  }
}

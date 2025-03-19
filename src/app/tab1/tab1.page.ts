// src/app/tab1/tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { FirestoreService } from 'src/service/firestore.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from 'firebase/auth';

interface Stats {
  clasesCompletadas: number;
  tareasCompletadas: number;
  logros: number;
}

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  user$: Observable<User | null>;
  stats$: Observable<Stats>; // Correct typing for the observable

  courses = [
    { id: 1, title: 'New Comers', image: 'assets/images/newcomers.webp' },
    { id: 2, title: 'Novices', image: 'assets/images/novices.jpg' },
    { id: 3, title: 'Skilled', image: 'assets/images/skilled.webp' },
    { id: 4, title: 'Transitionals', image: 'assets/images/transitionals.jpg' }
  ];

  constructor(
    private authService: AuthService, 
    private firestoreService: FirestoreService, 
    private router: Router
  ) {
    this.user$ = this.authService.currentUser$;
    this.stats$ = of({ clasesCompletadas: 0, tareasCompletadas: 0, logros: 0 }); // Initial value
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        // Fetch the stats as an observable to keep them dynamic
        this.stats$ = this.firestoreService.getUserStats(user.uid);
      }
    });
  }

  goToUpdateProfile() {
    this.router.navigate(['/update-profile']);
  }

  goToTab3() {
    this.router.navigate(['/tabs/tab3']);
  }

  goToSubscribe(courseId: number) {
    this.router.navigate(['/subscribe', courseId]);
  }
}

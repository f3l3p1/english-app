// src/app/tab1/tab1.page.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service'; // Make sure the path to AuthService is correct
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  user$: Observable<User | null>; // Declare user$ as an observable of User or null

  courses = [
    { title: 'New Comers', image: 'assets/images/newcomers.webp' },
    { title: 'Novices', image: 'assets/images/novices.jpg' },
    { title: 'Skilled', image: 'assets/images/skilled.webp' },
    { title: 'Transitionals', image: 'assets/images/transitionals.jpg' }
  ];

  constructor(private authService: AuthService) {
    // Initialize the user$ observable from the AuthService
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {}
}

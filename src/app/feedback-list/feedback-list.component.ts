import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/service/firestore.service';
import { AuthService } from 'src/service/auth.service';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.scss'],
})
export class FeedbackListComponent implements OnInit {
  feedbacks: any[] = [];
  user$: Observable<User | null>;

  constructor(private firestoreService: FirestoreService, private authService: AuthService) {
    this.user$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        const userId = user.uid;
        // Fetch feedbacks for the logged-in student
        this.firestoreService.getFeedbacksForStudent(userId).subscribe(feedbacks => {
          this.feedbacks = feedbacks;
        });
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/service/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss'],
})
export class FeedbackFormComponent implements OnInit {
  students: any[] = []; // List of students to give feedback to
  selectedStudent: string = ''; // Selected student ID
  feedback = {
    name: '',
    description: '',
    date: new Date(),
  };

  constructor(private firestoreService: FirestoreService, private router: Router) {}

  ngOnInit(): void {
    // Fetch students who are not teachers
    this.firestoreService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  giveFeedback() {
    if (this.selectedStudent) {
      this.firestoreService.addFeedback(this.selectedStudent, this.feedback).then(() => {
        console.log('Feedback added successfully');
        this.router.navigate(['/tabs/tab2']); // Redirect back to tab2 or another page
      }).catch(error => {
        console.error('Error adding feedback:', error);
      });
    }
  }
}

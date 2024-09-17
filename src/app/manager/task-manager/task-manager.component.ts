// src/app/manager/task-manager/task-manager.component.ts
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/service/firestore.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent implements OnInit {
  tasks: any[] = [];

  constructor(private firestoreService: FirestoreService, private route: ActivatedRoute) {}

  ngOnInit() {
    const lessonId = this.route.snapshot.paramMap.get('id');
    if (lessonId) {
      this.firestoreService.getTasks(lessonId).subscribe(tasks => {
        this.tasks = tasks;
      });
    }
  }

  startTask(task: any) {
    // Logic to start or display task (e.g., quiz, worksheet)
    alert(`Starting task: ${task.title}`);
  }
}

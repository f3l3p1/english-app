import { Component } from '@angular/core';
import { FirestoreService } from 'src/service/firestore.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss'],
})
export class TaskManagerComponent {
  tasks: { id: string, title: string, description: string }[] = []; // Define tasks array
  taskTitle = '';
  taskDescription = '';

  constructor(private firestoreService: FirestoreService) {}

  addTask(): void {
    const task = { title: this.taskTitle, description: this.taskDescription };
    this.firestoreService.addTask('lesson-id', task) // Replace 'lesson-id' with actual lesson ID
      .then(() => {
        alert('Task added successfully!');
        this.taskTitle = '';
        this.taskDescription = '';
        // Refresh or fetch tasks again
      })
      .catch((error: any) => {
        console.error('Error adding task:', error);
        alert('Failed to add task.');
      });
  }

  deleteTask(taskId: string): void {
    // Implement deletion logic using Firestore service
    alert(`Delete task with ID: ${taskId}`);
  }
}

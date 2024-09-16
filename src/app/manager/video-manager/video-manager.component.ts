import { Component } from '@angular/core';
import { FirestoreService } from 'src/service/firestore.service';

@Component({
  selector: 'app-video-manager',
  templateUrl: './video-manager.component.html',
  styleUrls: ['./video-manager.component.scss'],
})
export class VideoManagerComponent {
  videos: { id: string, name: string, url: string }[] = []; // Define videos array
  selectedFile: File | null = null;

  constructor(private firestoreService: FirestoreService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadVideo(): void {
    if (this.selectedFile) {
      this.firestoreService.addVideo('lesson-id', this.selectedFile) // Replace 'lesson-id' with actual lesson ID
        .then(() => {
          alert('Video uploaded successfully!');
          // Refresh or fetch videos again
        })
        .catch((error: any) => {
          console.error('Error uploading video:', error);
          alert('Failed to upload video.');
        });
    } else {
      alert('Please select a file first.');
    }
  }

  deleteVideo(videoId: string): void {
    // Implement deletion logic using Firestore service
    alert(`Delete video with ID: ${videoId}`);
  }
}

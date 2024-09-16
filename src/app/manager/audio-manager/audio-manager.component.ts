import { Component } from '@angular/core';
import { FirestoreService } from 'src/service/firestore.service';

@Component({
  selector: 'app-audio-manager',
  templateUrl: './audio-manager.component.html',
  styleUrls: ['./audio-manager.component.scss'],
})
export class AudioManagerComponent {
  audios: { id: string, name: string, url: string }[] = []; // Define audios array
  selectedFile: File | null = null;

  constructor(private firestoreService: FirestoreService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadAudio(): void {
    if (this.selectedFile) {
      this.firestoreService.addAudio('lesson-id', this.selectedFile) // Replace 'lesson-id' with actual lesson ID
        .then(() => {
          alert('Audio uploaded successfully!');
          // Refresh or fetch audios again
        })
        .catch((error: any) => {
          console.error('Error uploading audio:', error);
          alert('Failed to upload audio.');
        });
    } else {
      alert('Please select a file first.');
    }
  }

  deleteAudio(audioId: string): void {
    // Implement deletion logic using Firestore service
    alert(`Delete audio with ID: ${audioId}`);
  }
}

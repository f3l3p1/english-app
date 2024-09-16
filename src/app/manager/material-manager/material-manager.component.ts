import { Component } from '@angular/core';
import { FirestoreService } from 'src/service/firestore.service';

@Component({
  selector: 'app-material-manager',
  templateUrl: './material-manager.component.html',
  styleUrls: ['./material-manager.component.scss'],
})
export class MaterialManagerComponent {
  materials: { id: string, name: string, url: string }[] = []; // Define materials array
  selectedFile: File | null = null;

  constructor(private firestoreService: FirestoreService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadMaterial(): void {
    if (this.selectedFile) {
      this.firestoreService.addMaterial('lesson-id', this.selectedFile) // Replace 'lesson-id' with actual lesson ID
        .then(() => {
          alert('Material uploaded successfully!');
          // Refresh or fetch materials again
        })
        .catch((error: any) => {
          console.error('Error uploading material:', error);
          alert('Failed to upload material.');
        });
    } else {
      alert('Please select a file first.');
    }
  }

  downloadMaterial(url: string): void {
    window.open(url, '_blank');
  }

  deleteMaterial(materialId: string): void {
    // Implement deletion logic using Firestore service
    alert(`Delete material with ID: ${materialId}`);
  }
}

// src/app/update-profile/update-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  displayName: string = '';
  email: string = '';
  password: string = '';
  birthDate: string = '';
  profilePictureUrl: string | null = null;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.displayName = user.displayName || '';
        this.email = user.email || '';
        this.profilePictureUrl = user.photoURL;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const filePath = `profile_pictures/${this.afAuth.currentUser?.then(u => u?.uid)}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
      task.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.profilePictureUrl = url;
            this.updateProfilePicture(url); // Call the method with the URL
          });
        })
      ).subscribe();
    }
  }

  // Ensure this method accepts a URL argument
  updateProfilePicture(url: string): void {
    this.afAuth.currentUser?.then(user => {
      if (user) {
        user.updateProfile({ photoURL: url }).then(() => {
          this.firestore.collection('users').doc(user.uid).update({ photoURL: url }).then(() => {
            this.router.navigate(['/tabs/tab1']);  // Navigate back to Tab1
          });
        }).catch(error => {
          this.errorMessage = error.message;
        });
      }
    });
  }

  updateProfile(): void {
    this.afAuth.currentUser?.then(user => {
      if (user) {
        user.updateProfile({
          displayName: this.displayName,
          photoURL: this.profilePictureUrl
        }).then(() => {
          this.firestore.collection('users').doc(user.uid).update({
            displayName: this.displayName,
            email: this.email,
            birthDate: this.birthDate
          }).then(() => {
            alert('Profile updated successfully');
            this.router.navigate(['/tabs/tab1']);  // Navigate back to Tab1
          }).catch(error => {
            this.errorMessage = error.message;
          });
        }).catch(error => {
          this.errorMessage = error.message;
        });
      }
    });
  }
}

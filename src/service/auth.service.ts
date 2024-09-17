// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { User } from '@angular/fire/auth'; // Correct User type import
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();

    // Subscribe to AngularFireAuth auth state changes
    this.afAuth.authState.subscribe(user => {
      this.currentUserSubject.next(user as User | null); // Cast to resolve type conflict
    });
  }

  // Check if the user is authenticated
  isAuthenticated(): Observable<boolean> {
    return this.currentUser$.pipe(map(user => !!user));
  }

  // Login with email and password
  login(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(
      () => {
        this.router.navigate(['/tabs']);
      },
      (error) => {
        alert(error.message);
      }
    );
  }

 // Register with email and password and store user data in Firestore
 register(email: string, password: string): Promise<void> {
  return this.afAuth.createUserWithEmailAndPassword(email, password).then(
    async (userCredential) => {
      const user = userCredential.user as User; // Ensure correct type
      if (user) {
        // Using AngularFireAuth to update profile
        const currentUser = await this.afAuth.currentUser;
        if (currentUser) {
          await currentUser.updateProfile({ displayName: 'User Name' }); // Use currentUser
        }
        this.firestore.collection('users').doc(user.uid).set({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'User Name',
          createdAt: new Date(),
        }).then(() => {
          alert('Registration Successful');
          this.router.navigate(['/login']);
        }).catch((error) => {
          console.error('Error saving user data to Firestore:', error);
          alert('Failed to save user data. Please try again.');
        });
      }
    },
    (error) => {
      alert(error.message);
    }
  );
}


  // Logout
  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // Sign in with Google
  googleSignIn(): Promise<void> {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (result) => {
        const user = result.user as User; // Ensure correct type
        if (user) {
          const userDoc = this.firestore.collection('users').doc(user.uid);
          userDoc.get().subscribe((doc) => {
            if (!doc.exists) {
              userDoc.set({
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || 'Google User',
                createdAt: new Date(),
              }).then(() => {
                alert('Google Sign-In Successful');
                this.router.navigate(['/tabs']);
              }).catch((error) => {
                console.error('Error saving user data to Firestore:', error);
                alert('Failed to save user data. Please try again.');
              });
            } else {
              this.router.navigate(['/tabs']);
            }
          });
        }
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  // Forgot password
  forgotPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email).then(
      () => {
        alert('Password reset email sent.');
      },
      (error) => {
        alert(error.message);
      }
    );
  }

  // Upload Profile Picture
  uploadProfilePicture(file: File, userId: string): Promise<void> {
    const filePath = `profile_pictures/${userId}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return task
      .snapshotChanges()
      .toPromise()
      .then(() => fileRef.getDownloadURL().toPromise())
      .then((url) => {
        return this.firestore.collection('users').doc(userId).update({
          profilePictureUrl: url,
        });
      })
      .catch((error) => {
        console.error('Error uploading profile picture:', error);
        throw error;
      });
  }

  // Update user data in Firestore
  updateUserData(user: { uid: string, displayName: string, photoURL: string, email: string }): Promise<void> {
    return this.firestore.collection('users').doc(user.uid).update({
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email
    }).then(() => {
      console.log('User data updated successfully');
    }).catch((error) => {
      console.error('Error updating user data:', error);
      throw error;
    });
  }
}

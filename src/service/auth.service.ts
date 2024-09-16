// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Import Firestore
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore, // Inject Firestore
    private router: Router
  ) {}

  // Login with email and password
  login(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(
      () => {
        // Redirect to tabs page upon successful login
        this.router.navigate(['/tabs']);
      },
      (error) => {
        alert(error.message); // Simplified error handling
      }
    );
  }

  // Register with email and password and store user data in Firestore
  register(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(
      (userCredential) => {
        // Save the user data to Firestore
        const user = userCredential.user;
        if (user) {
          this.firestore.collection('users').doc(user.uid).set({
            uid: user.uid,
            email: user.email,
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
        alert(error.message); // Simplified error handling
      }
    );
  }

  // Logout
  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      // Redirect to login page after logging out
      this.router.navigate(['/login']);
    });
  }

  // Sign in with Google
  googleSignIn(): Promise<void> {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (result) => {
        // Check if the user already exists in Firestore, if not, create a new record
        const user = result.user;
        if (user) {
          const userDoc = this.firestore.collection('users').doc(user.uid);
          userDoc.get().subscribe((doc) => {
            if (!doc.exists) {
              // Save the user data to Firestore
              userDoc.set({
                uid: user.uid,
                email: user.email,
                createdAt: new Date(),
              }).then(() => {
                alert('Google Sign-In Successful');
                this.router.navigate(['/tabs']);
              }).catch((error) => {
                console.error('Error saving user data to Firestore:', error);
                alert('Failed to save user data. Please try again.');
              });
            } else {
              // User exists, navigate directly
              this.router.navigate(['/tabs']);
            }
          });
        }
      },
      (error) => {
        alert(error.message); // Simplified error handling
      }
    );
  }

  // Forgot password
  forgotPassword(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email).then(
      () => {
        alert('Password reset email sent.'); // Notification on success
      },
      (error) => {
        alert(error.message); // Simplified error handling
      }
    );
  }
}

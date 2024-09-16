// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser$: Observable<User | null>; // Observable for current user

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    // Initialize currentUser$ to observe the authentication state
    this.currentUser$ = this.afAuth.authState as Observable<User | null>;
  }

  // Method to get current user as an observable
  getUserObservable(): Observable<User | null> {
    return this.currentUser$;
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
      (userCredential) => {
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
        const user = result.user;
        if (user) {
          const userDoc = this.firestore.collection('users').doc(user.uid);
          userDoc.get().subscribe((doc) => {
            if (!doc.exists) {
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
}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

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

  // Register with email and password
  register(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert('Registration Successful');
        this.router.navigate(['/login']);
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

  // Check if a user is logged in
  isLoggedIn(): boolean {
    return this.afAuth.authState !== null;
  }

  // Sign in with Google
  googleSignIn(): Promise<void> {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(
      () => {
        // Redirect to tabs page upon successful login
        this.router.navigate(['/tabs']);
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

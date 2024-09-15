import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Added errorMessage property

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  login() {
    if (this.email === '') {
      this.errorMessage = 'Please enter email';
      return;
    }

    if (this.password === '') {
      this.errorMessage = 'Please enter password';
      return;
    }

    this.auth.login(this.email, this.password).catch((err: any) => {
      this.errorMessage = err.message; // Handle errors and display message
    });

    this.email = '';
    this.password = '';
  }

  signInWithGoogle() {
    this.auth.googleSignIn().catch((err: any) => {
      this.errorMessage = err.message; // Handle errors and display message
    });
  }

  forgotPassword() {
    if (!this.email) {
      this.errorMessage = 'Please enter your email to reset password.';
      return;
    }
    this.auth.forgotPassword(this.email).then(() => {
      this.errorMessage = 'Reset link sent to your email.';
    }).catch((err: any) => {
      this.errorMessage = 'Something went wrong. Please try again.';
    });
  }
}

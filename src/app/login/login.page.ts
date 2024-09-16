import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/service/auth.service'; // Ensure the correct path
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    if (this.email === '' || this.password === '') {
      this.errorMessage = 'Please enter email and password';
      return;
    }
    this.auth.login(this.email, this.password).catch((error) => {
      this.errorMessage = error.message;
    });
  }

  forgotPassword() {
    if (this.email === '') {
      this.errorMessage = 'Please enter your email to reset password';
      return;
    }
    this.auth.forgotPassword(this.email).catch((error) => {
      this.errorMessage = error.message;
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  // Correct method name to match HTML
  googleSignIn() {
    this.auth.googleSignIn().catch((error) => {
      this.errorMessage = error.message;
    });
  }
}

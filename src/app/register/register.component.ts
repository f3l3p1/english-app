import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service'; // Update path as necessary

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Call your registration method from AuthService
    this.authService.register(this.email, this.password).then(() => {
      alert('Registration successful');
      this.router.navigate(['/login']);
    }).catch(error => {
      alert(error.message);
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}

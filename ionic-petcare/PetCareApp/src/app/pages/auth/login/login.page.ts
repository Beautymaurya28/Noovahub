import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
// 1. Import necessary classes for Reactive Forms
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  // Key setting for Standalone component
  standalone: true,
  // 2. Import IonicModule, CommonModule, and ReactiveFormsModule
  imports: [
    IonicModule, 
    CommonModule, 
    ReactiveFormsModule // Essential for form validation
  ],
})
export class LoginPage implements OnInit {
  
  // Define the form group to hold controls
  loginForm: FormGroup;

  // Dependency Injection: Inject FormBuilder for creating the form and Router for navigation
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    // Initialize the form in the constructor
    this.loginForm = this.fb.group({
      // Email field with required and email pattern validators
      email: ['', [Validators.required, Validators.email]],
      
      // Password field with required and minimum length of 6 validators
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Initialization logic if needed
  }

  /**
   * Getter for easy access to form controls in the template
   * e.g., loginForm.controls.email
   */
  get controls() {
    return this.loginForm.controls;
  }

  /**
   * Handles the submission of the login form.
   */
  async onLoginSubmit() {
    // Check if the form passes all validation rules
    if (this.loginForm.invalid) {
      // Mark all fields as touched to display errors immediately
      this.loginForm.markAllAsTouched();
      // Optional: Add a subtle animation/vibration or toast notification to indicate failure
      console.log('Login failed: Form is invalid.');
      return;
    }

    // Form is valid: Proceed with login simulation
    const { email, password } = this.loginForm.value;

    // --- Authentication Simulation (Replace with real API call later) ---
    console.log('Attempting login with:', email, 'and password:', password);

    // Simulate successful login after a short delay
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    // After simulated successful login, navigate to the Home Dashboard
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  /**
   * Handles navigation to the Signup page.
   */
  goToSignup() {
    this.router.navigateByUrl('/signup');
  }

  /**
   * Handles social login (placeholder for optional feature).
   */
  socialLogin(platform: string) {
    console.log(`Simulating login via ${platform}...`);
    // Placeholder logic for OAuth flow
    // After success, navigate to home
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
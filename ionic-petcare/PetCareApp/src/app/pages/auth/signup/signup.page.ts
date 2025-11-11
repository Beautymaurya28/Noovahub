import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['../login/login.page.scss'], // Use shared styles
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    ReactiveFormsModule 
  ],
})
export class SignupPage implements OnInit {
  
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    // Initialize the form with controls and validation
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      // Add custom validator for password confirmation
      validators: this.passwordMatchValidator 
    });
  }

  ngOnInit() {}

  get controls() {
    return this.signupForm.controls;
  }

  /**
   * Custom validator to ensure password and confirmPassword match.
   */
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      // Set a custom error on the form group
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // Clear the custom error if they match
      if (control.get('confirmPassword')?.hasError('passwordMismatch')) {
        control.get('confirmPassword')?.setErrors(null);
      }
      return null;
    }
  }

  /**
   * Handles the submission of the signup form.
   */
  async onSignupSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      console.log('Signup failed: Form is invalid.');
      return;
    }

    const { fullName, email, password } = this.signupForm.value;

    // --- Registration Simulation ---
    console.log('Attempting registration for:', email);

    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    // Simulate successful registration and navigate to the Home Dashboard
    console.log('User registered successfully.');
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  /**
   * Handles social login (placeholder).
   */
  socialLogin(platform: string) {
    console.log(`Simulating login via ${platform}...`);
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
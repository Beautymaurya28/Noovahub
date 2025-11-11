import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule],
})
export class ContactPage implements OnInit {
  
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private router: Router
  ) {
    // Initialize the form with validation
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {}

  get controls() {
    return this.contactForm.controls;
  }

  /**
   * Handles the form submission to send the query.
   */
  async onSubmitQuery() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.presentToast('Please fix the errors in the form.', 'danger');
      return;
    }

    // --- Submission Simulation ---
    console.log('Contact form submitted:', this.contactForm.value);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Clear the form and show success message
    this.contactForm.reset();
    this.presentToast('Your query has been sent! We will respond shortly.', 'success');
    
    // Optional: navigate away after successful submission
    // this.router.navigateByUrl('/home');
  }

  /**
   * Presents an Ionic toast notification.
   */
  async presentToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }
}
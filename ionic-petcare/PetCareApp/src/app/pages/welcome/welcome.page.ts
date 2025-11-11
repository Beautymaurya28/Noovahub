import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Using the generic IonicModule is the most stable way to import all required Ionic components in a standalone setup
import { IonicModule } from '@ionic/angular'; 
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    IonicModule // Provides IonContent, IonButton, etc.
  ],
})
export class WelcomePage implements OnInit {
  
  public heading: string = "Welcome to PetCare 🐾";
  public tagline: string = "Your Pet’s Health, Our Priority.";

  constructor(private router: Router) { }

  ngOnInit() {
    // Initialization logic, if any
  }
  
  /**
   * Navigates to the login page programmatically.
   */
  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  /**
   * Navigates to the signup page programmatically.
   */
  goToSignup() {
    this.router.navigateByUrl('/signup');
  }
}

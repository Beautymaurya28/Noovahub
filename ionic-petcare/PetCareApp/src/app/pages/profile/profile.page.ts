import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router,RouterLink, RouterLinkWithHref } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Required for two-way binding on ion-toggle

// Define a simple structure for user data (in a real app, this would come from a service)
interface User {
  name: string;
  email: string;
  phone: string;
  notificationEnabled: boolean;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule,
    RouterLink,
    RouterLinkWithHref // Import FormsModule for notification settings toggle
  ],
})
export class ProfilePage implements OnInit {
  
  public user: User = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '555-123-4567',
    notificationEnabled: true
  };

  // Menu items for easy navigation within the profile hub
  public settingsMenuItems = [
    { title: 'Personal Information', icon: 'person-outline', url: '/profile/edit' },
    { title: 'Payment Methods', icon: 'card-outline', url: '/profile/payments' },
    { title: 'Order History', icon: 'receipt-outline', url: '/profile/orders' },
    { title: 'Address Book', icon: 'location-outline', url: '/profile/addresses' },
  ];

  constructor(
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // In a real application, fetch user data from an authentication/user service here.
    console.log('User data loaded:', this.user.name);
  }
  
  /**
   * Handles saving the notification setting change.
   */
  async saveNotificationSetting() {
    // Simulate API call to update user settings
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const message = this.user.notificationEnabled 
      ? 'Notifications enabled.' 
      : 'Notifications disabled.';
      
    this.presentToast(message, 'success');
  }

  /**
   * Logs the user out and navigates to the welcome/login screen.
   */
  async logout() {
    // Simulate authentication clear/API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.presentToast('Logged out successfully.', 'success');
    this.router.navigateByUrl('/welcome', { replaceUrl: true });
  }

  /**
   * Presents an Ionic toast notification.
   */
  async presentToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }
}
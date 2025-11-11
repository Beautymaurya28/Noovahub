import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLink, RouterLinkWithHref } from '@angular/router'; 
import { DataService, Product, Article } from 'src/app/services/data.service'; 

// Define interfaces for structured data
interface Pet {
  id: string;
  name: string;
  gender: 'Male' | 'Female';
  breed: string;
  image: string;
  lastCheckup: string; 
  weight: string; 
  age: string; 
  hasAlert: boolean; 
}
interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  routerLink: string;
}
interface ActivityItem {
  id: string;
  icon: string;
  text: string;
  date: string;
  routerLink?: string;
}
interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    RouterLink,             
    RouterLinkWithHref      
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HomePage implements OnInit {
  
  public userName: string = 'Alex'; 
  public petMomDad: string = 'Mom'; 
  public pets: Pet[] = []; 
  public quickActions: QuickAction[] = [];
  public recentActivities: ActivityItem[] = [];

  // Define the dashboardStats property (for the statistics cards)
  public dashboardStats: StatCard[] = [
    { title: 'Total Pets', value: '2', icon: 'paw', color: 'primary' },
    { title: 'Upcoming Bookings', value: '1', icon: 'calendar', color: 'tertiary' },
    { title: 'Cart Items', value: '0', icon: 'bag', color: 'danger' },
  ];
  
  public showHealthAlert: boolean = false; 

  constructor(
    public dataService: DataService, 
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadPetData();
    this.loadQuickActions();
    this.loadRecentActivities();
    this.checkHealthAlerts();
    
    // Subscribe to cart count updates to keep the stat card current
    this.dataService.cart$.subscribe(items => {
        const cartStat = this.dashboardStats.find(stat => stat.title === 'Cart Items');
        if (cartStat) {
            cartStat.value = items.length.toString();
        }
    });
  }

  // --- DATA LOADING ---

  loadPetData() {
    this.pets = [
      {
        id: 'p1', name: 'Bruno', gender: 'Male', breed: 'Golden Retriever', image: 'https://placehold.co/70x70/E5C07B/4B2E05?text=B',
        lastCheckup: 'Last visit 1 week ago', weight: 'Min 12 kg', age: '2 yrs', hasAlert: true
      },
      {
        id: 'p2', name: 'Whiskers', gender: 'Female', breed: 'Persian', image: 'https://placehold.co/70x70/4B2E05/F5E6CC?text=W',
        lastCheckup: 'Last visit 7 weeks ago', weight: 'Max 6 kg', age: '3 yrs', hasAlert: false
      },
      {
        id: 'p3', name: 'Max', gender: 'Male', breed: 'Labrador', image: 'https://placehold.co/70x70/92949C/FFFFFF?text=M',
        lastCheckup: 'Last visit 3 months ago', weight: 'Min 18 kg', age: '5 yrs', hasAlert: true
      }
    ];
  }

  loadQuickActions() {
    this.quickActions = [
      { id: 'qa1', title: 'Book Vet Appointment', description: 'Schedule a visit with our trusted vets.', icon: 'calendar-outline', routerLink: '/services' },
      { id: 'qa2', title: 'Shop Now', description: 'Browse food, toys, and accessories.', icon: 'cart-outline', routerLink: '/shop' },
      { id: 'qa3', title: 'View Vaccine Records', description: 'Check status and upcoming due dates.', icon: 'shield-half-outline', routerLink: '/pet-profile' },
    ];
  }

  loadRecentActivities() {
    this.recentActivities = [
      { id: 'a1', icon: 'syringe-outline', text: 'Bruno received his annual vaccination.', date: '1 Day Ago', routerLink: '/pet-profile/p1' },
      { id: 'a2', icon: 'reader-outline', text: 'Whiskers health record updated.', date: '2 Days Ago', routerLink: '/pet-profile/p2' },
      { id: 'a3', icon: 'cart-outline', text: 'New food ordered for Max.', date: '3 Days Ago', routerLink: '/shop' },
    ];
  }

  checkHealthAlerts() {
    this.showHealthAlert = this.pets.some(pet => pet.hasAlert);
  }

  // --- PET CARD ACTIONS (Functional Methods) ---

  addNewPet() {
    this.router.navigate(['/pet-profile/add']);
  }

  addHealthRecord(petId: string) {
    // Navigates to the Pet Profile Page, ready to add a record
    this.router.navigate(['/pet-profile'], { queryParams: { petId, action: 'add-record' } }); 
    this.presentToast(`Preparing health record form for Pet ID: ${petId}`, 'primary');
  }

  addVaccination(petId: string) {
    // Navigates to the Pet Profile Page, ready to add a vaccine
    this.router.navigate(['/pet-profile'], { queryParams: { petId, action: 'add-vaccine' } });
    this.presentToast(`Preparing vaccine form for Pet ID: ${petId}`, 'tertiary');
  }

  removePet(petId: string) {
    this.pets = this.pets.filter(pet => pet.id !== petId);
    this.checkHealthAlerts(); 
    this.presentToast(`Pet removed successfully.`, 'danger');
  }
  
  addToCart(product: Product) {
    this.dataService.addToCart(product);
    this.presentToast(`Product added to cart!`, 'primary');
  }

  // --- GENERAL UTILITIES ---
  
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }
}

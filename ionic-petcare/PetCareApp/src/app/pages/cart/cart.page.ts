import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

// Import the Data Service and Product interface for type safety
import { DataService, Product } from 'src/app/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class CartPage implements OnInit, OnDestroy {
  
  cartItems: Product[] = [];
  totalPrice: number = 0;
  private cartSubscription!: Subscription;

  constructor(
    private dataService: DataService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to the cart observable to get real-time updates
    this.cartSubscription = this.dataService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  /**
   * Calculates the total price of all items in the cart.
   */
  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  /**
   * Simulates the removal of an item from the cart.
   * NOTE: You need to implement removeCartItem(product) in DataService.
   */
  removeItem(product: Product) {
    // Placeholder implementation (assuming DataService has a method to remove items)
    // this.dataService.removeCartItem(product); 
    
    // For now, we'll simulate the update by filtering locally and assuming the service handles it.
    const index = this.cartItems.findIndex(item => item.id === product.id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      // Re-trigger the update/re-assignment in the service here in a real app
      this.calculateTotal(); 
    }
  }

  /**
   * Handles the checkout process simulation.
   */
  async checkout() {
    if (this.cartItems.length === 0) {
      this.presentToast('Your cart is empty!', 'warning');
      return;
    }

    // --- Checkout Simulation ---
    console.log(`Processing order for $${this.totalPrice.toFixed(2)}`);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Clear the cart in the service (assuming dataService.clearCart() exists)
    // this.dataService.clearCart(); 

    this.presentToast('Order placed successfully! Thank you for choosing PetCare.', 'success');
    
    // Navigate back to the home page or an order confirmation page
    this.router.navigateByUrl('/home', { replaceUrl: true });
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
  
  /**
   * Cleanup: Unsubscribe from the cart to prevent memory leaks.
   */
  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // For ion-searchbar and ion-segment [(ngModel)]
import { Router } from '@angular/router';

// Import Data Service and Product interface
import { DataService, Product } from 'src/app/services/data.service';
// NOTE: You would need to create a reusable ProductCardComponent to keep the HTML clean
// import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    // ProductCardComponent // Include your reusable component here
  ],
})
export class ShopPage implements OnInit {
  
  private allProducts: Product[] = [];
  public filteredProducts: Product[] = [];
  
  public categories: string[] = ['All', 'Food', 'Toys', 'Accessories', 'Health'];
  public selectedCategory: string = 'All';
  public searchTerm: string = '';

  constructor(
    public dataService: DataService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }
  
  /**
   * Fetches all product data from the DataService.
   */
  loadProducts() {
    // NOTE: Ensure DataService.getProducts() returns an array of Product objects
    this.allProducts = this.dataService.getProducts(); 
    this.applyFilters(); // Display all products initially
  }

  /**
   * Applies the current search term and category filter to the product list.
   */
  applyFilters() {
    let tempProducts = this.allProducts;

    // 1. Filter by Category
    if (this.selectedCategory !== 'All') {
      tempProducts = tempProducts.filter(
        product => product.category === this.selectedCategory
      );
    }

    // 2. Filter by Search Term (Product Name)
    if (this.searchTerm.trim() !== '') {
      const lowerCaseSearch = this.searchTerm.toLowerCase();
      tempProducts = tempProducts.filter(
        product => product.name.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    this.filteredProducts = tempProducts;
  }

  /**
   * Clears the search input and reapplies filters.
   */
  onSearchClear() {
    this.searchTerm = '';
    this.applyFilters();
  }
  
  /**
   * Adds a product to the cart via the DataService.
   * @param product The product object to add.
   */
  addToCart(product: Product) {
    this.dataService.addToCart(product);
    this.presentToast(`${product.name} added to cart!`, 'success');
  }

  /**
   * Presents an Ionic toast notification.
   */
  async presentToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }
}
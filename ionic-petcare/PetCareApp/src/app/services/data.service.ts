import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// --- INTERFACES FOR TYPE SAFETY ---
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string; // Food, Toys, Accessories, Health
  image: string;
  description: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  category: string; // Grooming, Medical, Training, Boarding
  price: number;
  icon: string;
}

export interface Article {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  date: string;
}

export interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: number;
  gender: 'Male' | 'Female';
  photoUrl: string;
  vaccinationRecord?: {
    lastVetVisit: string;
    rabiesVaccinated: boolean;
    nextAppointmentDate: string;
  };
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  // --- DUMMY DATA SOURCES ---

  private productsData: Product[] = [
    { id: 1, name: 'Premium Adult Dog Food', price: 49.99, category: 'Food', image: 'assets/products/dog-food.jpg', description: 'High-protein, grain-free formula.' },
    { id: 2, name: 'Interactive Cat Toy', price: 19.50, category: 'Toys', image: 'assets/products/cat-toy.jpg', description: 'Feather wand with LED light.' },
    { id: 3, name: 'Flea & Tick Collar', price: 25.00, category: 'Health', image: 'assets/products/flea-collar.jpg', description: '8 months protection for dogs.' },
    { id: 4, name: 'Luxury Pet Bed', price: 85.99, category: 'Accessories', image: 'assets/products/pet-bed.jpg', description: 'Soft orthopedic foam.' },
    { id: 5, name: 'Dental Chews (10pk)', price: 12.00, category: 'Health', image: 'assets/products/dental-chews.jpg', description: 'Promotes healthy gums and breath.' },
    { id: 6, name: 'Stainless Steel Bowl', price: 14.99, category: 'Accessories', image: 'assets/products/bowl.jpg', description: 'Non-slip, dishwasher safe.' },
  ];

  private servicesData: Service[] = [
    { id: 101, name: 'Full Grooming & Spa', description: 'Bath, trim, nail clipping, and ear cleaning.', category: 'Grooming', price: 75.00, icon: 'cut-outline' },
    { id: 102, name: 'Standard Vet Checkup', description: 'Annual physical exam and consultation.', category: 'Medical', price: 50.00, icon: 'medical-outline' },
    { id: 103, name: 'Weekend Boarding', description: 'Two nights stay with supervised playtime.', category: 'Boarding', price: 150.00, icon: 'home-outline' },
    { id: 104, name: 'Puppy Obedience Class', description: 'Five-session basic training course.', category: 'Training', price: 250.00, icon: 'school-outline' },
  ];

  private articlesData: Article[] = [
    { id: 201, title: 'Top 5 Tips for Puppy Training Success', category: 'Training', excerpt: 'Start early with positive reinforcement and consistency.', author: 'Dr. Emily R.', date: '2025-09-10' },
    { id: 202, title: 'Understanding Common Cat Allergies', category: 'Health', excerpt: 'Dietary triggers and environmental factors explained.', author: 'VetMD Team', date: '2025-10-01' },
    { id: 203, title: 'Choosing the Right Food for Senior Dogs', category: 'Nutrition', excerpt: 'Lower calories and joint support are key.', author: 'Jane D.', date: '2025-09-25' },
  ];

  // --- STATE MANAGEMENT (RxJS BehaviorSubjects) ---

  // 1. Cart State: Holds the list of products currently in the cart
  private cartItems = new BehaviorSubject<Product[]>([]);
  public cart$: Observable<Product[]> = this.cartItems.asObservable();

  // 2. User Pets State: Holds the list of pets added by the user
  // Initialize with some dummy pets
  private petProfiles = new BehaviorSubject<Pet[]>([
    { id: 1, name: 'Max', species: 'Dog', breed: 'Golden Retriever', age: 4, gender: 'Male', photoUrl: 'assets/pets/max.jpg', vaccinationRecord: { lastVetVisit: '2024-03-15', rabiesVaccinated: true, nextAppointmentDate: '2025-03-15' } },
    { id: 2, name: 'Luna', species: 'Cat', breed: 'Siamese', age: 2, gender: 'Female', photoUrl: 'assets/pets/luna.jpg', vaccinationRecord: { lastVetVisit: '2024-08-01', rabiesVaccinated: true, nextAppointmentDate: '2025-08-01' } },
  ]);
  public pets$: Observable<Pet[]> = this.petProfiles.asObservable();


  constructor() { }

  // --- PUBLIC GETTERS FOR STATIC DATA (Products, Services, Articles) ---

  getProducts(): Product[] {
    return this.productsData;
  }

  getServices(): Service[] {
    // Add dummy icons for the services page
    return this.servicesData.map(service => {
        switch (service.category) {
            case 'Grooming': service.icon = 'cut-outline'; break;
            case 'Medical': service.icon = 'medical-outline'; break;
            case 'Training': service.icon = 'school-outline'; break;
            case 'Boarding': service.icon = 'home-outline'; break;
            default: service.icon = 'star-outline';
        }
        return service;
    });
  }

  getArticles(): Article[] {
    return this.articlesData;
  }

  // --- CART MANAGEMENT METHODS ---

  addToCart(product: Product) {
    const currentCart = this.cartItems.value;
    // Add the new product to the current list
    this.cartItems.next([...currentCart, product]);
  }

  removeCartItem(id: number) {
    const currentCart = this.cartItems.value;
    const updatedCart = currentCart.filter(item => item.id !== id);
    this.cartItems.next(updatedCart);
  }
  
  clearCart() {
    this.cartItems.next([]);
  }

  getCartCount(): number {
    return this.cartItems.value.length;
  }

  // --- PET MANAGEMENT METHODS ---
  
  getPets(): Pet[] {
    return this.petProfiles.value;
  }

  getPetById(id: number): Pet | undefined {
    return this.petProfiles.value.find(pet => pet.id === id);
  }

  addPet(pet: Pet) {
    const currentPets = this.petProfiles.value;
    this.petProfiles.next([...currentPets, pet]);
  }

  updatePet(updatedPet: Pet) {
    const currentPets = this.petProfiles.value;
    const updatedList = currentPets.map(pet => 
      pet.id === updatedPet.id ? updatedPet : pet
    );
    this.petProfiles.next(updatedList);
  }

  // Add more methods as needed (e.g., deletePet)
}
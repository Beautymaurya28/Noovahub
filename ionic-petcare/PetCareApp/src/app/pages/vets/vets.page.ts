import { Component, OnInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import * as L from 'leaflet'; // REMOVED: Requires npm install and type definitions

// --- INTERFACES ---
interface Vet {
  id: number;
  name: string;
  qualification: string;
  specialization: string;
  rating: number;
  distance: number;
  photoUrl: string;
  experience: number;
  clinicName: string;
  address: string;
  phone: string;
  consultationType: 'Online' | 'In-person';
  description: string;
  lat: number;
  lng: number;
}
interface FilterOptions {
  radius: number;
  petType: string;
  consultationType: string;
  minRating: number;
}
// --- END INTERFACES ---

@Component({
  selector: 'app-vets',
  templateUrl: './vets.page.html',
  styleUrls: ['./vets.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    // RouterLink and RouterLinkWithHref intentionally removed to fix warnings
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VetsPage implements OnInit {
  @ViewChild('mapElement', { static: false }) mapElement!: ElementRef;
  // map!: L.Map; // REMOVED: Dependency on Leaflet type

  // --- STATE MANAGEMENT ---
  private allVets: Vet[] = [];
  public filteredVets: Vet[] = [];
  public searchTerm: string = '';
  public activeVet: Vet | null = null;

  // Modal State
  public isProfileModalOpen: boolean = false;
  public isBookingModalOpen: boolean = false;
  public isFilterModalOpen: boolean = false;
  public isRegisterFormOpen: boolean = false; // Toggleable registration section

  // Forms
  public bookingForm: FormGroup;
  public registrationForm: FormGroup;
  public filterOptions: FilterOptions = {
    radius: 10,
    petType: 'All',
    consultationType: 'All',
    minRating: 0
  };
  // --- END STATE MANAGEMENT ---

  constructor(
    private fb: FormBuilder,
    private toastController: ToastController,
    private router: Router
  ) {
    // 1. Initialize Booking Form
    this.bookingForm = this.fb.group({
      date: ['', Validators.required],
      timeSlot: ['', Validators.required],
      visitType: ['Clinic Visit', Validators.required],
      notes: ['']
    });

    // 2. Initialize Registration Form
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      qualification: ['', Validators.required],
      specialization: ['', Validators.required],
      experience: [null, [Validators.required, Validators.min(1)]],
      clinicName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      photoUrl: ['placeholder'],
      certification: ['placeholder']
    });
  }

  ngOnInit() {
    this.loadVetData();
    this.applyFilters();
  }

  ionViewDidEnter() {
    // Placeholder for map initialization since Leaflet isn't installed
    // this.initMap(); 
    // this.addVetMarkers();
    console.log("Map placeholder activated. Please run 'npm install leaflet @types/leaflet' for map functionality.");
  }
  
  // --- DATA LOADING & MAP PLACEHOLDER ---

  loadVetData() {
    // Dummy Vet Data including coordinates
    this.allVets = [
      {
        id: 1, name: 'Dr. Anya Sharma', qualification: 'DVM, PhD', specialization: 'Pet Dermatology', rating: 4.8, distance: 3.2, photoUrl: 'https://placehold.co/80x80/6E7DAB/FFFFFF?text=A', experience: 10, clinicName: 'Happy Paws Clinic', address: '456 Oak St, Petburg', phone: '555-1234', consultationType: 'Online', description: 'Expert in skin conditions and allergies for all pets.', lat: 40.7128, lng: -74.0060
      },
      {
        id: 2, name: 'Dr. Leo Chen', qualification: 'B.V.Sc', specialization: 'Emergency Care', rating: 4.5, distance: 1.5, photoUrl: 'https://placehold.co/80x80/96B3A8/000000?text=L', experience: 5, clinicName: 'Animal ER 24/7', address: '101 Pine Ln, Central City', phone: '555-5678', consultationType: 'In-person', description: 'Provides critical care during emergencies.', lat: 40.7200, lng: -73.9900
      },
      {
        id: 3, name: 'Dr. Mark Lee', qualification: 'DVM', specialization: 'Feline Specialist', rating: 4.9, distance: 7.8, photoUrl: 'https://placehold.co/80x80/7F8C8D/FFFFFF?text=M', experience: 7, clinicName: 'The Cat House', address: '789 Maple Ave, Quiet Town', phone: '555-9012', consultationType: 'Online', description: 'Dedicated exclusively to the health and well-being of cats.', lat: 40.7300, lng: -74.0150
      }
    ];
  }
  
  // initMap() { /* Removed Leaflet implementation */ }
  // addVetMarkers() { /* Removed Leaflet implementation */ }

  // --- FILTERING LOGIC ---

  applyFilters() {
    let tempVets = this.allVets;
    const { consultationType, minRating } = this.filterOptions;

    // 1. Search filter (by name or specialization)
    if (this.searchTerm.trim() !== '') {
      const term = this.searchTerm.toLowerCase();
      tempVets = tempVets.filter(v => 
        v.name.toLowerCase().includes(term) || 
        v.specialization.toLowerCase().includes(term)
      );
    }
    
    // 2. Consultation Type filter
    if (consultationType !== 'All') {
      tempVets = tempVets.filter(v => v.consultationType === consultationType);
    }

    // 3. Rating filter
    if (minRating > 0) {
      tempVets = tempVets.filter(v => v.rating >= minRating);
    }

    this.filteredVets = tempVets;
    this.isFilterModalOpen = false;
  }
  
  // --- MODAL & FORM HANDLERS ---

  openProfileModal(vet: Vet) {
    this.activeVet = vet;
    this.isProfileModalOpen = true;
    
    // Zoom map to vet location placeholder
    // if (this.map) { this.map.setView([vet.lat, vet.lng], 15); }
  }

  closeProfileModal() {
    this.isProfileModalOpen = false;
    this.activeVet = null;
    // Reset map view placeholder
    // if (this.map) this.map.setView([40.72, -74.00], 12);
  }
  
  openBookingModal() {
    this.isProfileModalOpen = false; 
    this.isBookingModalOpen = true;
    this.bookingForm.reset({ visitType: 'Clinic Visit' });
  }

  closeBookingModal() {
    this.isBookingModalOpen = false;
  }

  async confirmBooking() {
    if (this.bookingForm.invalid || !this.activeVet) {
      this.bookingForm.markAllAsTouched();
      this.presentToast('Please select a date and time.', 'danger');
      return;
    }

    const bookingData = { ...this.bookingForm.value, vet: this.activeVet.name };
    console.log('Booking Confirmed:', bookingData);
    
    this.closeBookingModal();
    this.presentToast(`Appointment with ${this.activeVet.name} booked successfully for ${bookingData.date}!`, 'success');
  }

  async submitRegistration() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      this.presentToast('Please fill all required fields correctly.', 'danger');
      return;
    }

    const regData = this.registrationForm.value;
    console.log('Vet Registration Submitted:', regData);
    
    this.isRegisterFormOpen = false;
    this.registrationForm.reset();
    this.presentToast('Vet profile registered successfully!', 'success');
  }

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
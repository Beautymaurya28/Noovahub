import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // For ion-segment/ngModel

// Import Data Service and interface (assuming DataService has a Service interface)
import { DataService } from 'src/app/services/data.service';
// NOTE: You would need to create a ServiceBookingModal component for the best UX
// import { ServiceBookingModal } from './service-booking-modal/service-booking-modal.page'; 

// Define a structure for the Service data
interface Service {
  id: number;
  name: string;
  description: string;
  category: string; // e.g., 'Grooming', 'Medical', 'Training'
  price: number;
  icon: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ServicesPage implements OnInit {
  
  private allServices: Service[] = [];
  public filteredServices: Service[] = [];
  
  public categories: string[] = ['All', 'Grooming', 'Medical', 'Training', 'Boarding'];
  public selectedCategory: string = 'All';

  constructor(
    private dataService: DataService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadServices();
  }
  
  /**
   * Fetches the service data from the DataService.
   */
  loadServices() {
    // NOTE: Ensure DataService.getServices() returns an array of Service objects
    this.allServices = this.dataService.getServices(); 
    this.applyFilter(); // Display all services initially
  }

  /**
   * Applies the current category filter to the list of services.
   */
  applyFilter() {
    if (this.selectedCategory === 'All') {
      this.filteredServices = this.allServices;
    } else {
      this.filteredServices = this.allServices.filter(
        service => service.category === this.selectedCategory
      );
    }
  }

  /**
   * Opens the booking modal or navigates to a booking form.
   * @param service The selected service object.
   */
  async openBookingModal(service: Service) {
    console.log(`Attempting to book: ${service.name}`);

    // RECOMMENDED: Use a modal for a quick booking flow
    // const modal = await this.modalController.create({
    //   component: ServiceBookingModal,
    //   componentProps: { service: service }
    // });
    // await modal.present();

    // ALTERNATIVE: Use a simple confirmation and Toast
    await this.presentToast(`Booking form opened for ${service.name}.`, 'warning');
    // In a real app, you'd navigate: this.router.navigate(['/services/book', service.id]);
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
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { RouterLink, RouterLinkWithHref, Router, NavigationEnd } from '@angular/router'; 
import { DataService } from './services/data.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule, // Provides all necessary Ionic components
    CommonModule, 
    RouterLink,
    RouterLinkWithHref
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  
  // This flag controls the visibility/interactivity of the side menu wrapper
  public isMenuEnabled: boolean = false; 
  public cartCount: number = 0; 
  private subscriptions = new Subscription();

  // Updated App Pages list, including 'Find a Vet'
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'My Pet Profiles', url: '/pet-profile', icon: 'paw' },
    { title: 'Find a Vet', url: '/vets', icon: 'stethoscope' }, // <-- NEW ITEM ADDED
    { title: 'Pet Services', url: '/services', icon: 'calendar' },
    { title: 'Shop & Products', url: '/shop', icon: 'bag' },
    { title: 'Articles & Blog', url: '/articles', icon: 'document-text' },
    { title: 'My Profile', url: '/profile', icon: 'person' },
  ];

  constructor(public dataService: DataService, private router: Router) {} 

  ngOnInit() {
    // 1. Cart State Subscription (Updates the cart badge count)
    this.subscriptions.add(
      this.dataService.cart$.subscribe(items => {
        this.cartCount = items.length;
      })
    );

    // 2. CORE LOGIC TO HIDE SIDEBAR on Auth/Welcome pages
    this.subscriptions.add(
      this.router.events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        // Define routes where the menu must be DISABLED (Welcome, Login, Signup)
        const restrictedRoutes = ['/welcome', '/login', '/signup'];
        this.isMenuEnabled = !restrictedRoutes.includes(event.urlAfterRedirects);
        
        // Explicitly update the ion-split-pane element's disabled state
        const splitPane = document.querySelector('ion-split-pane');
        if (splitPane) {
          splitPane.disabled = !this.isMenuEnabled;
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}

import { Routes } from '@angular/router';

export const routes: Routes = [
  
  // 1. INITIAL FLOW
  {
    path: '',
    redirectTo: 'welcome', 
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then(m => m.WelcomePage),
  },

  // 2. AUTHENTICATION ROUTES - FIX: Use a stable import path
  {
    path: 'login',
    // FIX: Use the full path with .ts extension to force resolution
    loadComponent: () => import('./pages/auth/login/login.page.ts').then(m => m.AuthComponent), 
  },
  {
    path: 'signup',
    // FIX: Use the full path with .ts extension to force resolution
    loadComponent: () => import('./pages/auth/login/login.page.ts').then(m => m.AuthComponent), 
  },
  
  // 3. MAIN APPLICATION ROUTES
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.page').then(m => m.ServicesPage),
  },
  {
    path: 'shop',
    loadComponent: () => import('./pages/shop/shop.page').then(m => m.ShopPage),
  },
  {
    path: 'articles',
    loadComponent: () => import('./pages/articles/articles.page').then(m => m.ArticlesPage),
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.page').then(m => m.CartPage),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.page').then(m => m.ContactPage),
  },
  
  // 4. VETS PAGE ROUTE
  {
    path: 'vets',
    loadComponent: () => import('./pages/vets/vets.page').then(m => m.VetsPage),
  },

  // 5. PROFILE AND PET MANAGEMENT ROUTES
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage),
  },
  
  
  

  // 6. WILDCARD ROUTE
  {
    path: '**',
    redirectTo: 'home', 
    pathMatch: 'full',
  },
];

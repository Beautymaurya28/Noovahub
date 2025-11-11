// // src/app/app-routing.module.ts (Example partial)
// import { NgModule } from '@angular/core';
// import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'welcome', // Start with the Welcome Page
//     pathMatch: 'full'
//   },
//   {
//     path: 'welcome',
//     loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
//   },
//   {
//     path: 'login',
//     loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
//   },
//   // ... rest of the main routes
// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}
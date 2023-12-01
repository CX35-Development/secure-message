import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'sender',
    pathMatch: 'full'
  },
  {
    path: 'sender',
    loadChildren: () => import('./sender/sender.module').then( m => m.SenderPageModule)
  },
  {
    path: 'recipient',
    loadChildren: () => import('./recipient/recipient.module').then( m => m.RecipientPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

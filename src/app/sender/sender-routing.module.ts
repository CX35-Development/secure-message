import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SenderPage } from './sender.page';

const routes: Routes = [
  {
    path: '',
    component: SenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SenderPageRoutingModule {}

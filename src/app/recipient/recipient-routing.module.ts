import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipientPage } from './recipient.page';

const routes: Routes = [
  {
    path: '',
    component: RecipientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipientPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SenderPageRoutingModule } from './sender-routing.module';

import { SenderPage } from './sender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SenderPageRoutingModule
  ],
  declarations: [SenderPage]
})
export class SenderPageModule {}

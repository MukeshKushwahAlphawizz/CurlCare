import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Profilepage_2Page } from './profilepage-2';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    Profilepage_2Page,
  ],
  imports: [StarRatingModule,
    IonicPageModule.forChild(Profilepage_2Page),
  ],
})
export class Profilepage_2PageModule {}

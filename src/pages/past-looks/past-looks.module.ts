import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PastLooksPage } from './past-looks';

@NgModule({
  declarations: [
    PastLooksPage,
  ],
  imports: [
    IonicPageModule.forChild(PastLooksPage),
  ],
})
export class PastLooksPageModule {}

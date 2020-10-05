import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SplashPage } from './splash';
import {IonicModule} from "ionic-angular/module";

@NgModule({
  declarations: [
    SplashPage,
  ],
    imports: [
        IonicPageModule.forChild(SplashPage),
        IonicModule,
    ],
})
export class SplashPageModule {}

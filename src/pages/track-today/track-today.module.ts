import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackTodayPage } from './track-today';
import {DatePickerModule} from "ionic-calendar-date-picker";

@NgModule({
  declarations: [
    TrackTodayPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackTodayPage),
    DatePickerModule
  ],
})
export class TrackTodayPageModule {}

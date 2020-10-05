import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profilepage-2',
  templateUrl: 'profilepage-2.html',
})
export class Profilepage_2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  back() {
    this.navCtrl.pop();
  }
}

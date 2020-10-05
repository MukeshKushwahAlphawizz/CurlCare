import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-privacy-terms-conditions',
  templateUrl: 'privacy-terms-conditions.html',
})
export class PrivacyTermsConditionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyTermsConditionsPage');
  }

}

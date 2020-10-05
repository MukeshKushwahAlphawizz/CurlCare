import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-payment-successful',
  templateUrl: 'payment-successful.html',
})
export class PaymentSuccessfulPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentSuccessfulPage');
  }

  paymentDone(){
    this.navCtrl.popToRoot();
  }

}

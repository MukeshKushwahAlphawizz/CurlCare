import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SocialSharing} from "@ionic-native/social-sharing";
import moment from "moment";

@IonicPage()
@Component({
  selector: 'page-payment-successful',
  templateUrl: 'payment-successful.html',
})
export class PaymentSuccessfulPage {

  last4:any='';
  cardName:any='';
  amount:any='';
  receiverName: any = '';
  transactionId: any = '';
  constructor(public navCtrl: NavController,
              public socialSharing:SocialSharing,
              public navParams: NavParams) {
    this.last4 = navParams.data.last4;
    this.cardName = navParams.data.cardName;
    this.amount = navParams.data.amount;
    this.receiverName = navParams.data.receiverName;
    this.transactionId = navParams.data.transactionId;

  }

  ionViewDidLoad() {
  }

  paymentDone(){
    this.navCtrl.popToRoot();
  }
  share() {
    this.socialSharing.share('','','','').then(succ=>{
    }).catch(err=>{
      console.error(err);
    })
  }
  getPaymenDate() {
    let date : any = new Date().getTime();
    return moment(parseInt(date)).format('DD MMM YYYY, LT');
  }
}

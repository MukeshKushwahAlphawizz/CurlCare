import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    //  public socialSharing: SocialSharing
     ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
  }

  changePassword() {
    this.navCtrl.push('ChangePasswordPage');
  }

  aboutCurlCare() {
    this.navCtrl.push('AboutPage');
  }


  help() {
    this.navCtrl.push('HelpPage');
  }

  privacyPolicy() {
    this.navCtrl.push('PrivacyTermsConditionsPage');
  }

  upgradeAccount() {
    this.navCtrl.push('SubscriptionPage');
  }

  // social sharing plugin
  // shareapp(message, subject, file, url) {
  //   // Share via
  //   this.socialSharing.share('Curl-Care Application', 'curlcare', null, 'url').then((success) => {
  //     console.log(success, "success");
  //     // Success!
  //   }).catch((error) => {
  //     console.log(error, "error");
  //     // Error!
  //   });
  // }

  //share via Email
  // shareViaEmail() {
  //   this.socialSharing.shareViaEmail('body', 'subject', ['dummy@gmail.com']).then((res) => {
  //     // Success
  //   }).catch((e) => {
  //     // Error!
  //   })
  // }
}

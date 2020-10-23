import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {SocialSharing} from "@ionic-native/social-sharing";
import {profileBaseURL, UtilProvider} from "../../providers/util/util";
import {el} from "@angular/platform-browser/testing/src/browser_util";
// import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  userData : any = '';
  profileBaseURL: string = profileBaseURL;
  enableNotification: boolean = true;
  constructor(public navCtrl: NavController,
              public storage : Storage,
              public util : UtilProvider,
              public socialShare : SocialSharing,
              public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.getUserData();
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
    if (this.userData.is_purchased ==='1'){
      this.util.presentAlert('','Already Subscribed');
    }else {
      this.navCtrl.push('SubscriptionPage');
    }

  }

  getUserData() {
    this.storage.get('userData').then(data=>{
      this.userData = JSON.parse(data);
    })
  }

  changePush(data) {
    console.log(data.checked);
    this.enableNotification = data.checked;
  }

    invite() {
      this.socialShare.share('','','','').then(()=>{}).catch(()=>{});
    }

    addAccount() {
        this.util.presentToast('This feature is coming soon!!');
    }
}

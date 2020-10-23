import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-privacy-terms-conditions',
  templateUrl: 'privacy-terms-conditions.html',
})
export class PrivacyTermsConditionsPage {

  data:any = '';
  constructor(public navCtrl: NavController,
              public user:User,
              public util:UtilProvider,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getData();
  }

  getData() {
    this.util.presentLoading('');
    this.user.getTermsCondition().subscribe(res=>{
      let resp : any = res;
      if (resp.status){
        this.data = resp.data;
      }else {
        this.util.presentLoading(resp.message);
      }
      setTimeout(()=>{
        this.util.dismissLoading();
      },500)
    },error => {
      console.error(error);
      this.util.dismissLoading();
    })
  }
}

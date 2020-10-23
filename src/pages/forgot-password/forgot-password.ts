import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {UtilProvider} from "../../providers/util/util";
import {User} from "../../providers";

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  email: any = '';

  constructor(public navCtrl: NavController,
              public util:UtilProvider,
              public user:User,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  sendDetails(){
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(this.email.trim())) {
      this.util.presentLoading('');
      let data = {
        "email":this.email
      }
      this.user.forgetPassword(data).subscribe(res=>{
        let resp : any = res;
        setTimeout(()=>{
          this.util.dismissLoading();
        },500)
        if (resp.status){
          this.navCtrl.pop();
          this.util.presentAlert('Success',resp.message);
        }else {
          this.util.presentToast(resp.message);
        }
      },error => {
        this.util.dismissLoading();
      })
    }else {
      this.util.presentToast('Please enter valid email');
    }
  }

    back() {
        this.navCtrl.pop();
    }
}

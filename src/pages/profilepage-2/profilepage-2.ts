import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {User} from "../../providers";
import {profileBaseURL, UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-profilepage-2',
  templateUrl: 'profilepage-2.html',
})
export class Profilepage_2Page {

  queueList :any = [];
  baseUrl : any = profileBaseURL;
  isEmpty: boolean = false;
  constructor(public navCtrl: NavController,
              public user: User,
              public util: UtilProvider,
              public storage: Storage,
              public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.getUserData();
  }

  back() {
    this.navCtrl.pop();
  }

  getUserData() {
    this.storage.get('userData').then(data=> {
      this.util.presentLoading('');
      let formData = new FormData();
      formData.append('user_id',JSON.parse(data).id);

      this.user.myCurlQueueData(formData).subscribe(res=>{
        let resp : any = res;
        if (resp.status){
          this.queueList = resp.result;
          this.queueList.length?this.isEmpty = false:this.isEmpty=true;
        }else {
          this.util.presentToast(resp.message);
        }
        setTimeout(()=>{
          this.util.dismissLoading();
        },500)
      },error => {
        console.error(error);
        this.util.dismissLoading();
      })
    });
  }
}

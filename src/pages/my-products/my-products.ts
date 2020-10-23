import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SocialSharing} from "@ionic-native/social-sharing";
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-my-products',
  templateUrl: 'my-products.html',
})
export class MyProductsPage {
  trackedList: any = [];
  lovedList: any = [];
  usedList: any = [];
  baseUrl : any = 'http://15.206.103.57/CurlCare/uploads/products/';
  isPurchased : boolean = false;
  isEmpty : boolean = false;

  constructor(public navCtrl: NavController,
              public socialShare : SocialSharing,
              public user: User,
              public util: UtilProvider,
              public storage: Storage,
              public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.getData();
  }
  getData(){
    this.storage.get('userData').then(data=> {
      JSON.parse(data).is_purchased ==='1'?this.isPurchased=true:this.isPurchased=false;
      this.util.presentLoading('');
      let formData = new FormData();
      formData.append('user_id',JSON.parse(data).id);

      this.user.productUsedData(formData).subscribe(res=>{
        let resp : any = res;
        if (resp.status){
          // this.baseUrl = resp.base_url;
          this.trackedList = resp.AllProductTracked;
          this.lovedList = resp.LoveIt;
          this.usedList = resp.Recently;
          if (resp.data === ''){
            this.isEmpty = true;
          }
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

  share() {
    this.socialShare.share('','','','').then(()=>{

    }).catch(()=>{

    })
  }
}

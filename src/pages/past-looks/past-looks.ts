import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SocialSharing} from "@ionic-native/social-sharing";
import {User} from "../../providers";
import {profileBaseURL, UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-past-looks',
  templateUrl: 'past-looks.html',
})
export class PastLooksPage {
  myLooksList: any = [];
  userData:any = '';
  profileImgToShow: string = '';
  profileBaseURL: any = profileBaseURL;
  pageSize: any = 3;
  pageNumber: any = 0;
  baseUrl : any = 'http://15.206.103.57/CurlCare/uploads/mylooks/';
  isEmpty: boolean = false;
  constructor(public navCtrl: NavController,
              public socialShare : SocialSharing,
              public user: User,
              public util: UtilProvider,
              public storage: Storage,
              public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.getMyAllLooks();
  }


  showMore(){
    this.getMyAllLooks();
  }

  share() {
    this.socialShare.share('','','','').then(succ=>{
      console.log('succ',succ);
    }).catch(err=>{
      console.error(err);
    })
  }

  getMyAllLooks() {
    this.storage.get('userData').then(data=> {
      this.userData = JSON.parse(data);
      if (this.userData.image !==''){
        this.profileImgToShow = this.profileBaseURL+this.userData.image;
      }
      this.util.presentLoading('');
      let formData = new FormData();
      formData.append('user_id',JSON.parse(data).id);
      formData.append('pageNumber',this.pageNumber);
      formData.append('pageSize',this.pageSize);

      this.user.myQueueListData(formData).subscribe(res=>{
        let resp : any = res;
        if (resp.status){
          // this.baseUrl = resp.base_url;
          this.myLooksList = [...this.myLooksList,...resp.result];
          this.myLooksList.length?this.isEmpty = false:this.isEmpty = true;
          this.pageNumber++;
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

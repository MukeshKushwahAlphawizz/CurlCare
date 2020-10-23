import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {User} from "../../providers";
import {profileBaseURL, UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";
import {ActionSheetController} from "ionic-angular/index";
import {SocialSharing} from "@ionic-native/social-sharing";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  /*animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(400, style({opacity:1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(200, style({opacity:0}))
      ])
    ]),
    trigger('slideIn', [
      state('*', style({ 'overflow-y': 'hidden' })),
      state('void', style({ 'overflow-y': 'hidden' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(300, style({ height: 0 }))
      ]),
      transition('void => *', [
        style({ height: '0' }),
        animate(300, style({ height: '*' }))
      ])
    ])
  ]*/
})
export class ProfilePage {
  title: any = '';
  showHairLength: boolean = false;
  userData: any = '';
  profileImg : any = '';
  profileImgToShow : any = '';
  profileBaseURL : any = profileBaseURL;
  curlPattern:any = '';
  curlWidth:any = '';
  hairPorosity:any = '';
  lengthInBack:any = '';
  lengthInSide:any = '';
  isPurchased : boolean = false;
  constructor(public navCtrl: NavController,
              public user: User,
              public util: UtilProvider,
              public storage: Storage,
              public socialShare: SocialSharing,
              public actionSheetCtrl: ActionSheetController,
              public navParams: NavParams) {
  }

  ionViewDidEnter() {
    this.getUserData();
  }

  save(){
    this.util.presentLoading('');
    let formData = new FormData();
    formData.append('image',this.profileImg);
    formData.append('curl_pattern',this.curlPattern);
    formData.append('curl_width',this.curlWidth);
    formData.append('hair_porosity',this.hairPorosity);
    formData.append('length_in_back',this.lengthInBack);
    formData.append('length_in_side',this.lengthInSide);
    formData.append('user_id',this.userData.id);

    this.user.updateProfileData(formData).subscribe(res=>{
      let resp : any = res;
      if (resp.status){
        this.storage.set('userData',JSON.stringify(resp.result)).then(res=>{
          this.navCtrl.push('Profilepage_2Page');
        });
      }
      this.util.presentToast(resp.message);
      setTimeout(()=>{
        this.util.dismissLoading();
      },500)
    },error => {
      console.error(error);
      this.util.dismissLoading();
    })
  }

  selectHairLength() {
    this.showHairLength?this.showHairLength=false:this.showHairLength = true;
  }

  getUserData() {
    this.storage.get('userData').then(data=>{
      this.userData = JSON.parse(data);
      if (this.userData.image !==''){
        this.profileImgToShow = this.profileBaseURL+this.userData.image;
      }
      this.userData.is_purchased ==='1'?this.isPurchased=true:this.isPurchased=false;
      this.title = this.userData.first_name;
      this.curlPattern = this.userData.curl_pattern;
      this.curlWidth = this.userData.curl_width;
      this.hairPorosity = this.userData.hair_porosity;
      if (this.userData.is_purchased == '1'){
        this.lengthInBack = this.userData.length_in_back;
        this.lengthInSide = this.userData.length_in_side;
      }
    })
  }

  openPicker() {
    let select = 'Choose or take a picture';
    let takePicture = 'Take a picture';
    let choosePicture = 'Choose picture';
    let actionSheet = this.actionSheetCtrl.create({
      title: select,
      buttons: [
        {
          text: takePicture,
          handler: () => {
            this.util.takePicture().then(data => {
              this.profileImg = data;
              this.profileImgToShow = 'data:image/png;base64,' + data;
            });
          }
        },
        {
          text: choosePicture,
          handler: () => {
            this.util.aceesGallery().then(data => {
              this.profileImg = data;
              this.profileImgToShow = 'data:image/png;base64,' + data;
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

  share() {
    this.socialShare.share('','','','').then(()=>{

    }).catch(err=>{

    });
  }
}

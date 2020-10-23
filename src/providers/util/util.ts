import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AlertController, Loading, LoadingController, ToastController} from "ionic-angular";
import {Camera} from "@ionic-native/camera";
import {User} from "..";
import {Storage} from "@ionic/storage";

export const ShineRating = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const MoistureRating = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const DefinitionRating = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const ShrinkageRating = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const HoldRating = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const FrizzRating = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const ProductFlake = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const ScalpFlake = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const Itch = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const Length = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const Smell = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const Feel = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const Compliments = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];

export const CurlShape = [
  {
    isSelect:false,
    rating : '1'
  },
  {
    isSelect:false,
    rating : '2'
  },
  {
    isSelect:false,
    rating : '3'
  },
  {
    isSelect:false,
    rating : '4'
  },
  {
    isSelect:false,
    rating : '5'
  }
];
export const profileBaseURL = 'http://15.206.103.57/CurlCare/uploads/products/';

@Injectable()
export class UtilProvider {
  base64Image: any;

  loading: Loading;
  loader: Loading;
  smallAlert: any;
  toast: any;
  constructor(public http: HttpClient,public toastCtrl:ToastController,
              private loadingCtrl: LoadingController,
              private user: User,
              private camera: Camera, private alertCtrl: AlertController, public storage: Storage) {

  }

  presentLoading(msg) {
    if (this.loading){
      this.dismissLoading();
    }else{
      this.loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: msg,
        duration: 6000
      });
      this.loading.present();
    }
  }
  presentLoader(msg) {
    if (this.loader){
      this.dismissLoader();
    }else{
      this.loader = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: msg,
        // duration: 6000
      });
      this.loader.present();
    }
  }

  dismissLoader(){
    if(this.loader) {
      this.loader.dismiss();
      this.loader = null;
    }
  }
  dismissLoading(){
    if(this.loading) {
      this.loading.dismiss();
      this.loading = null;
    }
  }

  presentAlert(title,msg) {
    if (!this.smallAlert){
      this.smallAlert = this.alertCtrl.create({
        title: title,
        subTitle: msg,
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.smallAlert = null;
          }
        }]
      });
      this.smallAlert.present();
    }
  }

  presentToast(message) {
    this.toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    this.toast.present();
  }


  presentConfirm(title, msg) {
    return new Promise((resolve, reject) => {
      let alert = this.alertCtrl.create({
        title: title,
        message: msg,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              reject();
            }
          },
          {
            text: 'Ok',
            handler: () => {
              resolve();
            }
          }
        ]
      });
      alert.present();
    })
  }
  // take picture from camera
  takePicture() {
    return new Promise((resolve, reject) => {
      this.camera.getPicture({
        quality:70,
        correctOrientation: true,
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.DATA_URL
      }).then((imageData) => {
        resolve(imageData)
      }, (err) => {
        reject(err);
      });
    })
  }

  // access gallery method
  aceesGallery() {
    return new Promise((resolve, reject) => {
      this.camera.getPicture({
        quality:70,
        sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
        destinationType: this.camera.DestinationType.DATA_URL
      }).then((imageData) => {
        resolve(imageData)
      }, (err) => {
        reject(err);
      });
    });
  }

  uploadImage(base64){
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append('upload_file',base64);
      /*this.user.uploadImage(formData).subscribe(res=>{
        let response : any = res;
        response.status?resolve(response):reject(response)
      },error => {
        console.error(error);
        reject (error)
      })*/
    })
  }

}

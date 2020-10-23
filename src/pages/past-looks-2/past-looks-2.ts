import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import {UtilProvider} from "../../providers/util/util";
import {ActionSheetController} from "ionic-angular/index";

@IonicPage()
@Component({
  selector: 'page-past-looks-2',
  templateUrl: 'past-looks-2.html',
})
export class PastLooks_2Page {
  productImg: any = '';
  name: any = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public util: UtilProvider,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }

  save() {
    if (this.name.trim() ==''){
      this.util.presentToast('Please add product name');
      return;
    }
    this.viewCtrl.dismiss({name:this.name,img:this.productImg});
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
              this.productImg = data;
            });
          }
        },
        {
          text: choosePicture,
          handler: () => {
            this.util.aceesGallery().then(data => {
              this.productImg = data;
            });
          }
        }
      ]
    });
    actionSheet.present();
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
}

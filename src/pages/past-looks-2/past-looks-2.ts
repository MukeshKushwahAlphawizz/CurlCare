import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-past-looks-2',
  templateUrl: 'past-looks-2.html',
})
export class PastLooks_2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }

  save() {
    this.viewCtrl.dismiss();
  }
}

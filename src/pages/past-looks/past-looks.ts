import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-past-looks',
  templateUrl: 'past-looks.html',
})
export class PastLooksPage {
  showMoredata:boolean=false;
  showButton:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PastLooksPage');
  }


  showMore(){
    this.showMoredata=true;
    this.showButton=false;

  }

}

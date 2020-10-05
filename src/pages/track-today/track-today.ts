import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController } from 'ionic-angular';
import moment from "moment";
import {
  DefinitionRating,
  FrizzRating,
  HoldRating,
  MoistureRating,
  ShineRating,
  ShrinkageRating
} from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-track-today',
  templateUrl: 'track-today.html',
})
export class TrackTodayPage {
  isShow:boolean=false;
  isAddmore:boolean=true;
  weekList: any = [];
  yes: boolean = true;
  shineRating = ShineRating;
  moistureRating = MoistureRating;
  definitionRating= DefinitionRating;
  shrinkageRating = ShrinkageRating;
  holdRating = HoldRating;
  frizzRating = FrizzRating;
  addMoreCount:number = 3;

  propertyList = [
    {name:'Shine',property:this.shineRating,isShown:true},
    {name:'Moisture',property:this.moistureRating,isShown:true},
    {name:'Definition',property:this.definitionRating,isShown:true},
    {name:'Shrinkage',property:this.shrinkageRating,isShown:false},
    {name:'Hold',property:this.holdRating,isShown:false},
    {name:'Frizz',property:this.frizzRating,isShown:false},
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,public modalCtrl: ModalController) {
  }

  addMore(){
    if (this.addMoreCount<=this.propertyList.length-1){
      this.propertyList[this.addMoreCount].isShown = true;
      this.addMoreCount++;
    }
    this.isAddmore=false;
  }

  save(){
    this.isAddmore=true;
  }

  showMore(){}

  saveDeails(){}

  addMoreProducts(){
    let modal = this.modalCtrl.create('PastLooks_2Page',  {showBackdrop: true, enableBackdropDismiss: true});
    modal.present();
  }


  ionViewDidLoad() {
    this.getWeekList();
  }
  getTodayDate(){
    let today = new Date();
    let dd = moment(new Date(today.getTime()), 'YYYY-MM-DD');
    return dd.format('dddd MMMM DD, YYYY')
  }
  
  getWeekList() {
    let today = new Date();
    for (let i = -3; i < 4; i++) {
      let date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      let d = moment(date, 'YYYY-MM-DD');
      let dd = moment(new Date(today.getTime() + (i * 24 * 60 * 60 * 1000)), 'YYYY-MM-DD');
      if (i == 0) {
        this.weekList.push({
          name: d.format('dddd'),
          date: dd.format('dddd MMMM DD, YYYY'),
          dayNum:dd.format('DD'),
          isSelected: true
        })
      } else {
        this.weekList.push({
          name: d.format('dddd'),
          date: date,
          dayNum:dd.format('DD'),
          isSelected: false
        })
      }
    }
    console.log(this.weekList);
  }

  getToday(day) {
    let date1 = new Date(Date.now());
    let d1 = moment(date1, 'YYYY-MM-DD');
    if (day.name == d1.format('dddd')) {
      return 'todayDate';
    } else {
      return '';
    }
  }

  selectDay(day: any) {
    this.weekList.filter(item => {
      if (item.name == day.name) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    })
  }

    addNotes() {

    }

  selectFeedback(isSelect: boolean) {
    isSelect?this.yes=true:this.yes=false;
  }

  selectRating(rate: any, type: string) {
    switch (type){
      case 'Shine': this.selectShineRating(rate);
        break;
      case 'Moisture': this.selectMoistureRating(rate);
        break;
      case 'Definition': this.selectDefinitionRating(rate);
        break;
      case 'Shrinkage': this.selectShrinkageRating(rate);
        break;
      case 'Hold': this.selectHoldRating(rate);
        break;
      case 'Frizz': this.selectFrizzRating(rate);
        break;
    }

  }

  selectShineRating(rate) {
    this.shineRating = this.shineRating.filter(item=>{
      if (item.rating == rate.rating){
        item.isSelect = true;
      }else {
        item.isSelect = false;
      }
      return item;
    })
  }

  selectMoistureRating(rate: any) {
    this.moistureRating = this.moistureRating.filter(item=>{
      if (item.rating == rate.rating){
        item.isSelect = true;
      }else {
        item.isSelect = false;
      }
      return item;
    })
  }

  selectDefinitionRating(rate: any) {
    this.definitionRating = this.definitionRating.filter(item=>{
      if (item.rating == rate.rating){
        item.isSelect = true;
      }else {
        item.isSelect = false;
      }
      return item;
    })
  }

  selectShrinkageRating(rate: any) {
    this.shrinkageRating = this.shrinkageRating.filter(item=>{
      if (item.rating == rate.rating){
        item.isSelect = true;
      }else {
        item.isSelect = false;
      }
      return item;
    })
  }

  selectHoldRating(rate: any) {
    this.holdRating = this.holdRating.filter(item=>{
      if (item.rating == rate.rating){
        item.isSelect = true;
      }else {
        item.isSelect = false;
      }
      return item;
    })
  }

  selectFrizzRating(rate: any) {
    this.frizzRating = this.frizzRating.filter(item=>{
      if (item.rating == rate.rating){
        item.isSelect = true;
      }else {
        item.isSelect = false;
      }
      return item;
    })
  }
}

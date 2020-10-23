import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController,ModalController } from 'ionic-angular';
import moment from "moment";
import {
  Compliments, CurlShape,
  DefinitionRating, Feel,
  FrizzRating,
  HoldRating, Itch, Length,
  MoistureRating, ProductFlake, profileBaseURL, ScalpFlake,
  ShineRating,
  ShrinkageRating, Smell, UtilProvider
} from "../../providers/util/util";
import {User} from "../../providers";
import {Storage} from "@ionic/storage";
import {ActionSheetController} from "ionic-angular/index";
import {SocialSharing} from "@ionic-native/social-sharing";

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

  productFlake = ProductFlake;
  scalpFlake = ScalpFlake;
  itch = Itch;
  length = Length;
  smell = Smell;
  feel = Feel;
  compliments = Compliments;
  curlShape = CurlShape;

  addMoreCount:number = 3;
  productList: any = [];
  productData: any = '';
  todayProduct: any = '';
  userData: any = '';
  washDay: any = '';
  todayStyle: any = '';
  profileImg: any = '';
  profileImgToShow: any = '';
  isPurchased: boolean = false;
  profileBaseURL: any = profileBaseURL;
  showTextarea: boolean = false;
  notes: any = '';
  propertyList = [];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: User,
              public util: UtilProvider,
              public socialSharing: SocialSharing,
              public storage: Storage,
              public actionSheetCtrl: ActionSheetController,
              public viewCtrl: ViewController,
              public modalCtrl: ModalController) {

  }

  addMore(){
    if (this.addMoreCount<=this.propertyList.length-1){
      this.propertyList[this.addMoreCount].isShown = true;
      this.addMoreCount++;
    }
    this.isAddmore=false;
  }


  addMoreProducts(){
    let modal = this.modalCtrl.create('PastLooks_2Page',  {showBackdrop: true, enableBackdropDismiss: true});
    modal.present();
    modal.onDidDismiss(data=>{
      if (data){
        this.productData = data;
        this.todayProduct = data.name;
      }
    })
  }


  ionViewDidEnter() {
    this.getUserData();
    this.getAllProductList();
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
      case 'Product Flake': this.productFlake = this.selectCategoryRating(this.productFlake,rate);
        break;
      case 'Scalp Flake': this.scalpFlake = this.selectCategoryRating(this.scalpFlake,rate);
        break;
      case 'Itch': this.itch = this.selectCategoryRating(this.itch,rate);
        break;
      case 'Length': this.length = this.selectCategoryRating(this.length,rate);
        break;
      case 'Smell': this.smell = this.selectCategoryRating(this.smell,rate);
        break;
      case 'Feel': this.feel = this.selectCategoryRating(this.feel,rate);
        break;
      case 'Compliments': this.compliments = this.selectCategoryRating(this.compliments,rate);
        break;
      case 'CurlShape': this.curlShape = this.selectCategoryRating(this.curlShape,rate);
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

  selectCategoryRating(category:any,rate: any) {
    return category = category.filter(item=>{
      if (item.rating == rate.rating){
        item.isSelect = true;
      }else {
        item.isSelect = false;
      }
      return item;
    })
  }

  getAllProductList() {
    this.user.getProductList().subscribe(res=>{
      let resp : any = res;
      if (resp.status){
        this.productList = resp.data;
      }
    },error => {
      console.error(error);
    })
  }

  saveProduct() {
    if (this.productData === ''){
      this.util.presentToast('Please add product by click on Add More Product button');
      return;
    }
    this.util.presentLoading('');
    let formData = new FormData();
    formData.append('user_id',this.userData.id);
    formData.append('name',this.productData.name);
    formData.append('image',this.productData.img);
    this.user.addProductData(formData).subscribe(res=>{
      let resp : any = res;
      if (resp.status){
        this.productData = '';
        this.productList.push({
          id: resp.result.id,
          image: resp.result.image,
          name: resp.result.name,
          user_id: resp.result.user_id
        });
        this.todayProduct = resp.result.id;
      }
      this.util.presentToast(resp.message);
      this.util.dismissLoading();
    },error => {
      console.error(error);
      this.util.dismissLoading();
    })
  }

  getUserData() {
    this.storage.get('userData').then(data=>{
      this.userData = JSON.parse(data);
      console.log(this.userData);
      if (this.userData.image !==''){
        this.profileImgToShow = this.profileBaseURL+this.userData.image;
      }
      this.userData.is_purchased ==='1'?this.isPurchased=true:this.isPurchased=false;
      // this.isPurchased = 0;
      console.log(this.isPurchased);
      this.setPropertyList();
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

  save(){
    if (this.isPurchased && this.washDay == ''){
      this.util.presentAlert('','Please select wash day');
      return;
    }
    if (this.todayProduct == ''){
      this.util.presentAlert('','Please select or add more product');
      return;
    }

    this.util.presentLoading('');
    let formData = new FormData();
    formData.append('user_id',this.userData.id);
    formData.append('love_it',this.yes?'1':'0');
    formData.append('wash_day',this.washDay);
    formData.append('todays_style',this.todayStyle);
    formData.append('Today_Product',this.todayProduct);

    let shineRating  = '0';
    let moistureRating  = '0';
    let definitionRating  = '0';
    let shrinkageRating  = '0';
    let holdRating  = '0';
    let frizzRating  = '0';

    this.shineRating.filter(item=>{
      if (item.isSelect){
        shineRating = item.rating;
      }
    });
    this.moistureRating.filter(item=>{
      if (item.isSelect){
        moistureRating = item.rating;
      }
    });
    this.moistureRating.filter(item=>{
      if (item.isSelect){
        definitionRating = item.rating;
      }
    });
    this.moistureRating.filter(item=>{
      if (item.isSelect){
        shrinkageRating = item.rating;
      }
    });
    this.moistureRating.filter(item=>{
      if (item.isSelect){
        holdRating = item.rating;
      }
    });
    this.moistureRating.filter(item=>{
      if (item.isSelect){
        frizzRating = item.rating;
      }
    });

    formData.append('shine',shineRating);
    formData.append('moisture',moistureRating);
    formData.append('definition',definitionRating);
    formData.append('shrinkage',shrinkageRating);
    formData.append('hold',holdRating);
    formData.append('frizz',frizzRating);

    formData.append('notes',this.notes);
    let product_flake = '0';
    let scalp_flake = '0';
    let Itch = '0';
    let length = '0';
    let smell = '0';
    let feel = '0';
    let compliments = '0';
    let curl_shape = '0';

    this.productFlake.filter(item=>{
      if (item.isSelect){
        product_flake = item.rating;
      }
    });
    this.scalpFlake.filter(item=>{
      if (item.isSelect){
        scalp_flake = item.rating;
      }
    });
    this.itch.filter(item=>{
      if (item.isSelect){
        Itch = item.rating;
      }
    });
    this.length.filter(item=>{
      if (item.isSelect){
        length = item.rating;
      }
    });
    this.smell.filter(item=>{
      if (item.isSelect){
        smell = item.rating;
      }
    });
    this.feel.filter(item=>{
      if (item.isSelect){
        feel = item.rating;
      }
    });
    this.compliments.filter(item=>{
      if (item.isSelect){
        compliments = item.rating;
      }
    });
    this.curlShape.filter(item=>{
      if (item.isSelect){
        curl_shape = item.rating;
      }
    });


    formData.append('product_flake',product_flake);
    formData.append('scalp_flake',scalp_flake);
    formData.append('Itch',Itch);
    formData.append('length',length);
    formData.append('smell',smell);
    formData.append('feel',feel);
    formData.append('compliments',compliments);
    formData.append('curl_shape',curl_shape);
    formData.append('image',this.profileImg);

    this.user.trackToday(formData).subscribe(res=>{
      let resp : any = res;
      if (resp.status){

      }
      this.util.presentToast(resp.message);
      setTimeout(()=>{
        this.util.dismissLoading();
      },500);
    },error => {
      this.util.dismissLoading();
      console.error(error);
    })
  }

  getMonth() {
    let monthNames = ['January','February','March','April','May','Jun','July','August','September','October','November','December'];
    let thisMonth = monthNames[(new Date()).getMonth()];
    return thisMonth;
  }

  share() {
    this.socialSharing.share('','','','').then(succ=>{
      console.log('succ',succ);
    }).catch(err=>{
      console.error(err);
    })
  }

    openNotes() {
        this.showTextarea = true;
    }

  setPropertyList() {
   if (this.isPurchased){
     this.propertyList = [
       {name:'Shine',property:this.shineRating,isShown:true},
       {name:'Moisture',property:this.moistureRating,isShown:true},
       {name:'Definition',property:this.definitionRating,isShown:true},
       {name:'Shrinkage',property:this.shrinkageRating,isShown:false},
       {name:'Hold',property:this.holdRating,isShown:false},
       {name:'Frizz',property:this.frizzRating,isShown:false},
       {name:'Product Flake',property:this.productFlake,isShown:false},
       {name:'Scalp Flake',property:this.scalpFlake,isShown:false},
       {name:'Itch',property:this.itch,isShown:false},
       {name:'Length',property:this.length,isShown:false},
       {name:'Smell',property:this.smell,isShown:false},
       {name:'Feel',property:this.feel,isShown:false},
       {name:'Compliments',property:this.compliments,isShown:false},
       {name:'CurlShape',property:this.curlShape,isShown:false}
     ]
   } else {
     this.propertyList = [
         {name:'Shine',property:this.shineRating,isShown:true},
         {name:'Moisture',property:this.moistureRating,isShown:true},
         {name:'Definition',property:this.definitionRating,isShown:true}
       ]
   }
  }
}

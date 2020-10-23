import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class User {
  registration:string='Authentication/registration';
  login:string='Authentication/login';
  socialLoginUrl:string='Authentication/SocialLogin';
  forgetPasswordUrl:string='Authentication/ForgetPassword';
  updatePasswordUrl:string='Authentication/updatePassword';
  aboutUs:string='Authentication/AboutUs';
  termsCondition:string='Authentication/TermsCondition';
  contactUs:string='Authentication/ContactUs';
  myProducts:string='Authentication/MyProducts';
  addProduct:string='Authentication/AddProduct';
  updateProfile:string='Authentication/UpdateProfile';
  addTrack:string='Authentication/AddTrack';
  myCurlQueue:string='Authentication/MyCurlQueue';
  productUsed:string='Authentication/productUsed';
  myQueueList:string='Authentication/MyQueueList';
  addPackage:string='Authentication/addPackage';

  constructor(public api: Api) { }

  loginData(accountInfo: any) {
    let seq = this.api.post(this.login, accountInfo).share();
    return seq;
  }
  signup(accountInfo: any) {
    let seq = this.api.post(this.registration, accountInfo).share();
    return seq;
  }
  socialLogin(data: any) {
    let seq = this.api.post(this.socialLoginUrl, data).share();
    return seq;
  }
  forgetPassword(data: any) {
    let seq = this.api.post(this.forgetPasswordUrl, data).share();
    return seq;
  }
  updatePassword(data: any) {
    let seq = this.api.post(this.updatePasswordUrl, data).share();
    return seq;
  }
  getAboutUs() {
    let seq = this.api.get(this.aboutUs).share();
    return seq;
  }
  getTermsCondition() {
    let seq = this.api.get(this.termsCondition).share();
    return seq;
  }
  getProductList() {
    let seq = this.api.get(this.myProducts).share();
    return seq;
  }
  contactUsForm(data: any) {
    let seq = this.api.post(this.contactUs, data).share();
    return seq;
  }
  addProductData(data: any) {
    let seq = this.api.post(this.addProduct, data).share();
    return seq;
  }
  updateProfileData(data: any) {
    let seq = this.api.post(this.updateProfile, data).share();
    return seq;
  }
  trackToday(data: any) {
    let seq = this.api.post(this.addTrack, data).share();
    return seq;
  }
  myCurlQueueData(data: any) {
    let seq = this.api.post(this.myCurlQueue, data).share();
    return seq;
  }
  productUsedData(data: any) {
    let seq = this.api.post(this.productUsed, data).share();
    return seq;
  }
  myQueueListData(data: any) {
    let seq = this.api.post(this.myQueueList, data).share();
    return seq;
  }
  paymentStripe(data: any) {
    let seq = this.api.post(this.addPackage, data).share();
    return seq;
  }
}

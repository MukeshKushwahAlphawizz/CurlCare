import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  changeForm : FormGroup
  error_messages: any = {};
  userEmail : any = ''
  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public user: User,
              public storage: Storage,
              public util: UtilProvider,
              public navParams: NavParams) {
    this.setupForm();
  }

  ionViewDidLoad() {
    this.storage.get('userData').then(user=>{
      this.userEmail = JSON.parse(user).email;
    })
  }

  saveDetails(){
    if (this.changeForm.value.password.toString().trim() !== this.changeForm.value.confirmPassword.toString().trim()){
      this.util.presentToast('Password and Confirm Password are not matched.');
      return;
    }
    this.util.presentLoading('');
    let formData = new FormData();
    formData.append('email',this.userEmail);
    formData.append('oldpassword',this.changeForm.value.oldPassword);
    formData.append('newpassword',this.changeForm.value.password);

    this.user.updatePassword(formData).subscribe(res=>{
      let resp : any = res;
      if (resp.status){
        this.util.presentAlert('Success','Password Successfully Changed');
        this.back();
      }else {
        this.util.presentToast(resp.message);
      }
      setTimeout(()=>{
        this.util.dismissLoading();
      },500);
    },error => {
      console.error(error);
      this.util.dismissLoading();
    })
  }

  back() {
    this.navCtrl.pop();
  }

  setupForm(){
    this.error_messages = {
      oldPassword: [
        { type: "required", message: 'Old Password is required' }
      ],
      password: [
        { type: "required", message: 'Password is required' },
        { type: "minlength", message: "Minimun length should be 8" },
        { type: "maxlength", message: "Maximum length should be 12" }
      ],
      confirmPassword: [
        { type: "required", message: 'Confirm Password is required' },
        { type: "minlength", message: "Minimun length should be 8" },
        { type: "maxlength", message: "Maximum length should be 12" }
      ]
    };
    this.changeForm = this.formBuilder.group(
        {
          oldPassword: new FormControl(
              "",
              Validators.compose([
                Validators.required
              ])
          ),
          password: new FormControl(
              "",
              Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(12)
              ])
          ),
          confirmPassword: new FormControl(
              "",
              Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(12)
              ])
          )},
    );
  }
}

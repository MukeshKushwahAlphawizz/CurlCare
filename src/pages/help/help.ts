import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Storage} from "@ionic/storage";
import {User} from "../../providers";
import {UtilProvider} from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  contactForm: FormGroup;
  error_messages: any = {};
  userData :any = '';
  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public storage:Storage,
              public user: User,
              public util: UtilProvider,
              public navParams: NavParams) {
    this.setContactUsForm();
  }

  ionViewDidLoad() {
    this.storage.get('userData').then(data=>{
      let userData : any = JSON.parse(data);
      console.log('user data from storage ==',userData);
      this.contactForm.controls.name.setValue(userData.first_name);
      this.contactForm.controls.email.setValue(userData.email);
      this.contactForm.controls.mobile_no.setValue(userData.phone_number);
    })
  }

  send() {
   this.util.presentLoading('');
   let formData = new  FormData();
   formData.append('name',this.contactForm.value.name);
   formData.append('email',this.contactForm.value.email);
   formData.append('subject',this.contactForm.value.mobile_no);
   formData.append('message',this.contactForm.value.message);

    this.user.contactUsForm(formData).subscribe(res=>{
     let response : any = res;
     if (response.status){
       this.util.presentAlert('Success','Message send successfully');
       this.navCtrl.pop();
     }else {
       this.util.presentToast(response.message);
     }
     setTimeout(()=>{
       this.util.dismissLoading();
     },500)
   },error => {
     console.error(error);
     this.util.dismissLoading();
   })
  }

  setContactUsForm() {
    this.error_messages = {
      name: [
        { type: "required", message: "Name is required" },
        { type: "pattern", message: 'Enter valid name' }
      ],
      email: [
        { type: "required", message: 'Email is required' },
        { type: "pattern", message: 'Enter valid email' },
      ],
      mobile_no: [
        { type: "required", message: 'Password is required' },
        { type: "minlength", message: "Minimun length should be 8" },
        { type: "maxlength", message: "Maximum length should be 12" }
      ],
      message: [
        { type: "required", message: 'Message is required' },
      ]
    };
    this.contactForm = this.formBuilder.group(
        {
          name: new FormControl(
              "",
              Validators.compose([
                Validators.required,
                Validators.pattern('[a-zA-Z ]*')
              ])
          ),
          email: new FormControl(
              "",
              Validators.compose([
                Validators.required,
                Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
              ])
          ),
          mobile_no: new FormControl(
              "",
              Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(12)
              ])
          ),
          message: new FormControl(
              "",
              Validators.compose([
                Validators.required
              ])
          )},
    );
  }
}

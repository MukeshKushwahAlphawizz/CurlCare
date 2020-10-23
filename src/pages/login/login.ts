import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from '../../providers';
import {NavParams, Platform} from "ionic-angular/index";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UtilProvider} from "../../providers/util/util";
import {Storage} from "@ionic/storage";
import {Facebook, FacebookLoginResponse} from "@ionic-native/facebook";
import {HttpClient} from "@angular/common/http";
import {GooglePlus} from "@ionic-native/google-plus";
import {FCM} from "@ionic-native/fcm";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  userDetails: any = '';
  isLoginType:boolean=false;
  signUpForm: FormGroup;
  loginForm: FormGroup;
  error_messages: any = {};
  error_messages_login: any = {};
  show: boolean = false;
  firebaseToken: string = '';

  constructor(public navCtrl: NavController,
              public navParams:NavParams,
              public util:UtilProvider,
              public fb: Facebook,
              public fcm: FCM,
              private googlePlus: GooglePlus,
              public httpClient: HttpClient,
              public storage:Storage,
              public platform:Platform,
              public formBuilder: FormBuilder, public user: User) {
    navParams.data.type? this.userDetails = "login":this.userDetails = "signup";
      if (this.platform.is('cordova')) {
          setTimeout(()=>{
              this.setupFcm();
          },500);
      }
      this.setupSignUpForm();
      this.setupLoginForm();
  }

  openForgotPassord() {
    this.navCtrl.push('ForgotPasswordPage');
  }

    signup(){
      if (this.validateSignup()){
          this.util.presentLoading('');
          let formData = new  FormData();
          formData.append('username',this.signUpForm.value.username);
          formData.append('firstname',this.signUpForm.value.firstName);
          formData.append('email',this.signUpForm.value.email);
          formData.append('password',this.signUpForm.value.password);
          formData.append('firebasetoken',this.firebaseToken);

          this.user.signup(formData).subscribe(res=>{
              let resp : any = res;
              setTimeout(()=>{
                  this.util.dismissLoading();
              },500);
              if (resp.status){
                  this.storage.set('userData',JSON.stringify(resp.data)).then(()=>{
                      this.navCtrl.setRoot('TabsPage');
                  });
              }else{
                  this.util.presentToast(resp.message);
              }
          },error => {
              this.util.dismissLoading();
              console.error(error.message);
          })
      }
  }

    setupSignUpForm() {
    this.error_messages = {
      firstName: [
        { type: "required", message: "First Name is required" },
        { type: "pattern", message: 'Enter valid name' }
      ],
      username: [
        { type: "required", message: "Username is required" }
      ],
        email: [
            { type: "required", message: 'Email is required' },
            { type: "pattern", message: '*Enter valid email' },
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
    this.signUpForm = this.formBuilder.group(
        {
          firstName: new FormControl(
              "",
              Validators.compose([
                Validators.required,
                Validators.pattern('[a-zA-Z ]*')
              ])
          ),
          username: new FormControl(
              "",
              Validators.compose([
                Validators.required
              ])
          ),
            email: new FormControl(
                "",
                Validators.compose([
                    Validators.required,
                    Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
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

    validateSignup(){
      if (this.signUpForm.value.password.toString().trim() !== this.signUpForm.value.confirmPassword.toString().trim()){
          this.util.presentToast('Password and Confirm Password not matched');
          return false;
      }
      return true;
  }

    setupLoginForm() {
        this.error_messages_login = {
            email: [
                { type: "required", message: 'Email is required' },
                { type: "pattern", message: 'Please enter valid email' }
            ],

            password: [
                { type: "required", message: 'Password is required' }
            ],
        };
        this.loginForm = this.formBuilder.group(
            {
                email: new FormControl(
                    "",
                    Validators.compose([
                        Validators.required,
                        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
                    ])
                ),
                password: new FormControl(
                    "",
                    Validators.compose([
                        Validators.required,
                    ])
                ),
            },
        );
    }

    login() {
        let formData = new FormData();
        formData.append('email',this.loginForm.value.email);
        formData.append('password',this.loginForm.value.password);
        formData.append('firebasetoken',this.firebaseToken);
        this.util.presentLoading('');
        this.user.loginData(formData).subscribe(res=>{
            let resp : any = res;
            setTimeout(()=>{
                this.util.dismissLoading();
            },500)
            if (resp.status){
                this.storage.set('userData',JSON.stringify(resp.data)).then(()=>{
                    this.navCtrl.setRoot('TabsPage');
                });
            }else {
                this.util.presentToast(resp.message);
            }
        },error => {
            // this.util.presentToast(error.message);
            this.util.dismissLoading();
        })
    }

    fbLogin() {
        this.fb.login(['public_profile', 'email'])
            .then((res: FacebookLoginResponse) => {
                let authResponse = res.authResponse;
                if (authResponse.accessToken) {
                    this.httpClient.get(`https://graph.facebook.com/me?fields=name,email,picture.width(400).height(400)&access_token=${authResponse.accessToken}`).subscribe(
                        data=> {
                            let fbResponse:any = data;
                            console.log(fbResponse);
                            this.callSocialRegisterApi(fbResponse.name,fbResponse.email,fbResponse.picture.data.url?fbResponse.picture.data.url:'',1,authResponse.accessToken);
                        },error => {
                            console.log(error);
                        }
                    );
                }
            })
            .catch(e => console.log('Error logging into Facebook', e));
    }

    googleLogin(){
        this.googlePlus.login({})
            .then(res => {
                console.log('response ====>', res);
                let googleData : any = res;
                this.callSocialRegisterApi(googleData.givenName,googleData.email,googleData.imageUrl?googleData.imageUrl:'',2,googleData.accessToken);
            })
            .catch(err => console.error(err));
    }

    callSocialRegisterApi(name: any, email: any, profile: any, type: number,token:any) {
        this.util.presentLoading('');
        let data = {
            name:name,
            email:email,
            social:token,
            facebookID:type
        }
        this.user.socialLogin(data).subscribe(res=>{
            let resp : any = res;
            setTimeout(()=>{
                this.util.dismissLoading();
            },500)
            if (resp.status){
                this.storage.set('userData',JSON.stringify(resp.data)).then(()=>{
                    this.navCtrl.setRoot('TabsPage');
                });
            }else {
                this.util.presentToast(resp.message);
            }

        },error => {
            this.util.dismissLoading();
        })
    }

     setupFcm() {
        this.fcm.subscribeToTopic('marketing');
        this.fcm.getToken().then(token => {
            console.log('token >>>',token);
            this.firebaseToken = token;
        });

        this.fcm.onNotification().subscribe(data => {
            if(data.wasTapped){
                console.log("Received in background",data);
            } else {
                console.log("Received in foreground",data);
            };
        });

        this.fcm.onTokenRefresh().subscribe(token => {
        });
         this.fcm.unsubscribeFromTopic('marketing');
    }
}

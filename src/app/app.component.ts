import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import {Storage} from "@ionic/storage";


@Component({
  template: `<ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = '';

  @ViewChild(Nav) nav: Nav;

  constructor(private translate: TranslateService,
              platform: Platform,
              public storage : Storage,
              private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      storage.get('userData').then(user=>{
        if (user){
          this.rootPage = 'TabsPage';
        }else {
          this.rootPage = 'SplashPage';
        }
      })
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

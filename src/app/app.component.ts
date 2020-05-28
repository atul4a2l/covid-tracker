import { Component,ViewChildren, QueryList  } from '@angular/core';
import { Router} from '@angular/router'
import { Platform,IonRouterOutlet,ModalController,MenuController,ToastController,ActionSheetController,PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
      // set up hardware back button event.
      lastTimeBackPress = 0;
      timePeriodToExit = 2000;
      @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    private menu: MenuController,
    private actionSheetCtrl: ActionSheetController,
    private popoverCtrl: PopoverController,
    private router: Router,
    private toastController: ToastController,
    private androidPermissions: AndroidPermissions
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.statusBar.backgroundColorByHexString('#ff6540');
      this.splashScreen.hide();
    })
  }

  async backButtonEvent() {
     this.platform.backButton.subscribe(async () => {
        // close action sheet
        // try {
        //     const element = await this.actionSheetCtrl.getTop();
        //     if (element) {
        //         element.dismiss();
        //         return;
        //     }
        // } catch (error) {
        // }

        // close popover
        // try {
        //     const element = await this.popoverCtrl.getTop();
        //     if (element) {
        //         element.dismiss();
        //         return;
        //     }
        // } catch (error) {
        // }

        // close modal
        // try {
        //     const element = await this.modalCtrl.getTop();
        //     if (element) {
        //         element.dismiss();
        //         return;
        //     }
        // } catch (error) {
        //     console.log(error);

        // }

        // close side menua
        // try {
        //     const element = await this.menu.getOpen();
        //     if (element !== null) {
        //         this.menu.close();
        //         return;

        //     }

        // } catch (error) {

        // }

        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {

        if (this.router.url === '/tabs/tab1' || this.router.url === '/tabs/tab2' ||
            this.router.url === '/tabs/tab3' || this.router.url === '/tabs/tab4' ||this.router.url === '/tabs/tab5') {
                if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                    navigator['app'].exitApp(); // work in ionic 4

                } else {
                    this.presentToast('Press back again to exit App')
                    this.lastTimeBackPress = new Date().getTime();
                }
            }
        });
    });
}

async presentToast(msg:string) {
  const toast = await this.toastController.create({
    message: msg,
    cssClass: "toast-scheme ",
    duration: 2000
  });
  toast.present();
}

  ngOnInit(){

  }
}

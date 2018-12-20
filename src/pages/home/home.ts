import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import {RegisterPage} from '../register/register';
import {LoggedinPage} from '../loggedin/loggedin';
import { Storage } from '@ionic/storage';
import { FcmProvider } from '../../providers/fcm/fcm';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';
import { ToastController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController,private storage :Storage, fcm: FcmProvider, toastCtrl: ToastController) {

       fcm.getToken()
       fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      )
      .subscribe()

  	//check storage kalo ada, lsg redirect
 	this.storage.get('uname').then((val) => {       
      console.log('Result is', val);

      	if(val!==''){
      		this.navCtrl.setRoot(LoggedinPage,{
				username: val
			});	
      	}
      	
    });

  }


 	signIn(){
 		this.navCtrl.push(LoginPage);
 	}


 	register(){
 		this.navCtrl.push(RegisterPage);
 	}

}

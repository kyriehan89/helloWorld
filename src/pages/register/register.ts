import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
	@ViewChild('username') uname;
	@ViewChild('password') password;
  constructor(public alertCtrl:AlertController,private fire:AngularFireAuth,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerUser(){
  	this.fire.auth.createUserWithEmailAndPassword(this.uname.value,this.password.value)
  	.then(data=>{
console.log("got data:"+data);
		const alert = this.alertCtrl.create({
      title: 'Success Message!',
      subTitle: 'Success Register!',
      buttons: ['OK']
    });
    alert.present();
  	})
.catch(error =>{
console.log("got error:"+error);
const alert = this.alertCtrl.create({
      title: 'Error Message!',
      subTitle: 'You got error:'+error.message,
      buttons: ['OK']
    });
    alert.present();
});  	
  	console.log("register:"+this.uname.value);
  }

}

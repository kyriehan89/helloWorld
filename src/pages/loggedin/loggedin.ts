import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';
import {ChatPage} from '../chat/chat';
import {HttpPage} from '../http/http';
import {MysqlPage} from '../mysql/mysql';
import {PlacesPage} from '../places/places';
import {ApprovalPage} from '../approval/approval';
import {CameraPage} from '../camera/camera';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the LoggedinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loggedin',
  templateUrl: 'loggedin.html',
})
export class LoggedinPage {
	username:string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage :Storage) {
  	//alert('start');
  	 this.username = this.navParams.get('username');
  	 //alert(this.username);

  	 //if(this.username === '' || this.username===undefined){
  	 //	alert('username null');
  	// }

  	console.log('navParams:'+navParams.data.username);
  }

  	redirectChat(){
		//this.navCtrl.push(LoginPage);
		this.navCtrl.push(ChatPage,{
			username: this.username
		});
	}

	redirectLogout(){

		//clean storage

		this.storage.set('uname','');   
		this.navCtrl.setRoot(HomePage);
	}

	redirectHTTP(){
		this.navCtrl.push(HttpPage);
	}

	redirectPlaces(){
			this.navCtrl.push(PlacesPage);
	}

	redirectMySql(){
		this.navCtrl.push(MysqlPage);
	}

	redirectApproval(){
		this.navCtrl.push(ApprovalPage,{
            username: this.username
          });
	}

	redirectCamera(){
		this.navCtrl.push(CameraPage,{
            //username: this.username
          });
	}


	ionViewDidLoad() {
		console.log('ionViewDidLoad LoggedinPage');
	}

}

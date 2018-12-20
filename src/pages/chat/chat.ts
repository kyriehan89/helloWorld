import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , Content,LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import {UtilService} from '../../services/util.service';
/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {	
	@ViewChild(Content) content: Content;
  loader:any;
	//messages:any = [];
	 arrData = []
  	arrDataDisplay = []
	messagesDisplay:any = [];
	message:string = '';
	username:string = '';
	_chatSubscription;
	messages:object = [];
  constructor(public fdb: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams,private utilService:UtilService,
    public loadingCtrl: LoadingController) {
    this.loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      this.loader.present();

      this.username = this.navParams.get('username');
      // console.log('masuk constructor');

      //push join notif
      this.fdb.list('/chat').push({
        specialMessage: true,
        message: `${this.username} has joined the room`
      });

      this._chatSubscription = this.fdb.list('/chat').valueChanges().subscribe( data => {
       // console.log('masuk subscribe');
        this.messages = data;
       // alert('try to scroll');
         this.content.scrollToBottom();
         this.loader.dismiss();
      });
      // console.log('after constructor');

    }

  sendMessage(){
  	this.fdb.list('/chat').push({
  		username:this.username,
  		message:this.message
  	}).then(data=>{
      this.content.scrollToBottom();

  	});
  	
  	this.message = '';
  }


    ionViewDidLoad() {
       setTimeout(() => {
          this.content.scrollToBottom(300);
       }, 1000);
    }

    ionViewWillLeave(){
    
      this._chatSubscription.unsubscribe();
      this.fdb.list('/chat').push({
        specialMessage: true,
        message: `${this.username} has left the room`
      });
    }
  

}

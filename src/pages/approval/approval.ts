import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { Observable} from 'rxjs/Observable';
import {UtilService} from '../../services/util.service';
import { Badge } from '@ionic-native/badge';
/**
 * Generated class for the ApprovalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-approval',
  templateUrl: 'approval.html',
})
export class ApprovalPage {
	result:any = [];
	username:string = "";
  loader:any;
	data: Observable<any>;
  items = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient,
    public alertCtrl:AlertController,public utilService:UtilService,private loadingCtrl:LoadingController,
    private badge: Badge) {
    this.badge.set(8);
    this.badge.increase(1);
    this.loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
    this.loader.present();

   

   	this.username = this.navParams.get('username');
   	this.refreshGet();
     for (let i = 0; i < 30; i++) {
      this.items.push( this.items.length );
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApprovalPage');
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

   doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

   refreshGet(){
    var url = 'http://179.15.128.73:90/ionicbackend/salesssn.php?action=getData&uname='+this.username;
    this.data = this.http.get(url);
  //  this.http.get('/games/?fields=name,release_dates,screenshots&limit='+this.limit+'&offset='+offset+'&order=release_dates.date:desc&filter[genres][eq]='+genre_id+'&filter[screenshots][exists]', this.options)
    this.data.subscribe(data=>{
      console.log(data);
      this.result = data;
      
      //auto save to offline
      //this.storage.set('result',this.result);   
    }, function(err) { 
      //this.dismissLoader();
      alert('Error Connection:'+err.message);
      //get data from DB when error internet  
    }
    );

    this.dismissLoader();
  }

  dismissLoader(){
    if(this.loader!=null){
      this.loader.dismiss();
    }
  }

  approve (i){
    console.log('i:'+i);
    console.log('this.arrData[i]:'+this.result[i].id);
    console.log('this.arrData[i]:'+this.result[i]);
    //console.log('this.arrData[i]:'+this.arrData[i].$key);
    //call service to delete
    let alert = this.alertCtrl.create({
    title: 'Confirm Approve',
    message: 'Do you want to approve this request?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Approve',
        handler: () => {
          console.log('Buy clicked');
          //call http update
          this.updateApproval('approve',this.result[i].id);
        }
      }
    ]
  });
  alert.present();
  }

  reject (i){
    let alert = this.alertCtrl.create({
    title: 'Confirm Approve',
    message: 'Do you want to reject this request?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Reject',
        handler: () => {
          console.log('Reject clicked');
          //call http update
          this.updateApproval('reject',this.result[i].id);
        }
      }
    ]
  });
  alert.present();
  }


  updateApproval(action:string,id:string){
    var url = 'http://179.15.128.73:90/ionicbackend/salesssn.php?action='+action+'&id='+id;
    this.data = this.http.get(url);
  //  this.http.get('/games/?fields=name,release_dates,screenshots&limit='+this.limit+'&offset='+offset+'&order=release_dates.date:desc&filter[genres][eq]='+genre_id+'&filter[screenshots][exists]', this.options)
    this.data.subscribe(data=>{
      console.log(data);
      if(action === 'approve' ){
       alert('Success Approve');
      }else{
         alert('Success Reject');
      }
     
      //this.result = data;
      //auto save to offline
      //this.storage.set('result',this.result);   
      this.refreshGet();
    }, function(err) { 
      alert('Error Conncetion:'+err.message);
      //alert('Using Offline DB')
      //get data from DB when error internet  
    });




  }


}

import { Component,ViewChild } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {MysqlPage} from '../mysql/mysql';
/**
 * Generated class for the HttpupsertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-httpupsert',
  templateUrl: 'httpupsert.html',
})
export class HttpupsertPage {
	@ViewChild('data') data;
	result:any=[];
	key:string="";
	value:string="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient
  	,public alertCtrl: AlertController) {
  	//get param
  	 this.key = this.navParams.get('key');
  	 this.value = this.navParams.get('value');
  	 //populate value to unout text


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HttpupsertPage');
     this.data.value = this.value;
  }

  upsertData(){
  	console.log('data:'+this.data.value);
  	var url = 'http://179.15.128.73:90/ionicbackend/test.php?action=addData';
  	if(this.value!=null && this.value!=''){
  		url = 'http://179.15.128.73:90/ionicbackend/test.php?action=updateData';
  	}


  	//call http servlet to update
  	
  	let postData = new FormData();
  	postData.append('value',this.data.value);
  	postData.append('key',this.key);
	//postData.append('han.hartono','han.hartono@gmail.com');
    this.data = this.http.post(url,postData);
  //  this.http.get('/games/?fields=name,release_dates,screenshots&limit='+this.limit+'&offset='+offset+'&order=release_dates.date:desc&filter[genres][eq]='+genre_id+'&filter[screenshots][exists]', this.options)
    this.data.subscribe(data=>{
      console.log(data);
      this.result = data.result;

      console.log('data result:'+this.result);

      //Toast success
      const alert = this.alertCtrl.create({
	      title: "Message",
	      subTitle: this.result,
	      buttons: ['OK']
	    });
	    alert.present();
	     this.navCtrl.push(MysqlPage);
      //auto save to offline
      //this.storage.set('result',this.result);   
    }, function(err) { 
    	alert('Error Connection'); 
      //alert('Using Offline DB')
      //get data from DB when error internet  
    });
  }

}

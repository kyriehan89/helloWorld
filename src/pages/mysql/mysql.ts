import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import {HttpupsertPage} from '../httpupsert/httpupsert';
/**
 * Generated class for the HttpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mysql',
  templateUrl: 'mysql.html',
})
export class MysqlPage {
	data: Observable<any>;
 	result:any = [];
   public isSearchOpened:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public http:HttpClient,private storage :Storage,public alertCtrl: AlertController) {
    this.refreshGet();
  }


  onInput(event){
    //console.log('masuk on search');
    console.log(event.target.value);
  }

  btnGetClicked(){
    //this.storage.ready();
     console.log('masuk get clicked');
    // this.refreshData();
    this.refreshGet();

  }	

  clearResultClicked(){
  ///	this.refreshData();
  	 this.storage.set('result',null); 
  	  this.result = null; 
  }
  

  btnSaveClicked(){
     this.storage.set('result',this.result);   
  }

  btnAddClicked(){
    this.navCtrl.push(HttpupsertPage);
  }

  delete (i){
    console.log('i:'+i);
    console.log('this.arrData[i]:'+this.result[i].key);
    console.log('this.arrData[i]:'+this.result[i]);
    //console.log('this.arrData[i]:'+this.arrData[i].$key);
    //call service to delete
    var url = 'http://179.15.128.73:90/ionicbackend/test.php?action=deleteData';
    let postData = new FormData();
    postData.append('value',this.result[i].value);
    postData.append('key',this.result[i].key);
  //postData.append('han.hartono','han.hartono@gmail.com');
    this.data = this.http.post(url,postData);
  //  this.http.get('/games/?fields=name,release_dates,screenshots&limit='+this.limit+'&offset='+offset+'&order=release_dates.date:desc&filter[genres][eq]='+genre_id+'&filter[screenshots][exists]', this.options)
    this.data.subscribe(data=>{
      console.log(data);
      this.result = data.result.value;
      //Toast success
      const alert = this.alertCtrl.create({
        title: "Message",
        subTitle: "Data Successfully Deleted!",
        buttons: ['OK']
      });
      alert.present();
      //this.btnGetClicked();
      //auto save to offline
      //this.storage.set('result',this.result);   
      this.refreshGet();
    }, function(err) { 
      alert('Error Connection');
      //get data from DB when error internet  
    });
  }


  update (i){
    console.log('i:'+i);
    console.log('this.arrData[i]:'+this.result[i].key);
    console.log('this.arrData[i]:'+this.result[i]);
    //console.log('this.arrData[i]:'+this.arrData[i].$key);
    //call service to delete
    this.navCtrl.push(HttpupsertPage,{
      key:this.result[i].key,
      value:this.result[i].value
    });
  }

  refreshGet(){
    var url = 'http://179.15.128.73:90/ionicbackend/test.php?action=getData';
    this.data = this.http.get(url);
  //  this.http.get('/games/?fields=name,release_dates,screenshots&limit='+this.limit+'&offset='+offset+'&order=release_dates.date:desc&filter[genres][eq]='+genre_id+'&filter[screenshots][exists]', this.options)
    this.data.subscribe(data=>{
      console.log(data);
      this.result = data;
      //auto save to offline
      //this.storage.set('result',this.result);   
    }, function(err) { 
      //alert('Using Offline DB')
      //get data from DB when error internet  
    });
  }


  btnLoadClicked(){
  	//this.refreshData();
    console.log('masuk load clicked');
    this.storage.get('result').then((val) => {
       //if(val!=null){         
         this.result = val;
      // }
      console.log('Result is', val);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HttpPage');
  }

}

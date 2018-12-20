import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the HttpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-http',
  templateUrl: 'http.html',
})
export class HttpPage {
	data: Observable<any>;
 	result:any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,
  	public http:HttpClient,private storage :Storage) {
  }

  btnGetClicked(){
    //this.storage.ready();
     console.log('masuk get clicked');
    // this.refreshData();
    var url = 'https://jsonplaceholder.typicode.com/posts';
    this.data = this.http.get(url);
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

  clearResultClicked(){
  ///	this.refreshData();
  	 this.storage.set('result',null); 
  	  this.result = null; 
  }
  

  btnSaveClicked(){
     console.log('masuk save clicked'+this.result);
     this.storage.set('result',this.result);   
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

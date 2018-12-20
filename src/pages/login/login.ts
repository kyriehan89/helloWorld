import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import {LoggedinPage} from '../loggedin/loggedin';
import { Storage } from '@ionic/storage';
import { Observable} from 'rxjs/Observable';
import { HttpClient} from '@angular/common/http';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	@ViewChild('username') uname;
	@ViewChild('password') password;
  data: Observable<any>;
   loader:any;
  constructor(private fire:AngularFireAuth,public navCtrl: NavController, 
    public navParams: NavParams,public alertCtrl: AlertController,private storage :Storage,
    private http:HttpClient, public loadingCtrl: LoadingController) {
   

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }



 

   /*signInUser(){
  	console.log(this.uname.value,this.password.value);	
    
    this.fire.auth.signInWithEmailAndPassword(this.uname.value,this.password.value)
    .then(data=>{
      alert('You have successfully Login!');
      //save data to storage - username aja dl?

      this.storage.set('uname',this.uname.value);   
		/*this.alert('Success Login','You have successfully Login!');
		this.navCtrl.setRoot(ChatPage,{
			username: this.uname.value

		});


	this.navCtrl.setRoot(LoggedinPage,{
			username: this.uname.value

		});
//	this.navCtrl.push(LoggedinPage);


    }).catch(error=>{
		alert('You got Error:'+error.message);

    });

  }
*/
  signInUser(){
    //login dengan konsep SSO
    var url = 'http://192.168.3.81:8080/sso/login?id='+this.uname.value+'&pwd='+this.password.value;
    
     this.loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      this.loader.present();
    //call http servlet to update
    let postData = new FormData();
    postData.append('id',this.uname.value);
    postData.append('pwd',this.password.value);
  //postData.append('han.hartono','han.hartono@gmail.com');
    this.data = this.http.get(url,{responseType: 'text'});
  //  this.http.get('/games/?fields=name,release_dates,screenshots&limit='+this.limit+'&offset='+offset+'&order=release_dates.date:desc&filter[genres][eq]='+genre_id+'&filter[screenshots][exists]', this.options)
    this.data.subscribe(data=>{
      console.log(data);
      var index = data.indexOf( "true" ); 
     // console.log("indexOf found String :" + index );   

      if(index<0){
        alert('Username and Password is invalid');
      }else{
        //redirect to page - sukses login
        this.storage.set('uname',this.uname.value);   
        
        this.navCtrl.setRoot(LoggedinPage,{
            username: this.uname.value

          });



      }
      

      //this.result = data.result;

      //console.log('data result:'+this.result);

      //Toast success
      /*const alert = this.alertCtrl.create({
        title: "Message",
        subTitle: this.result,
        buttons: ['OK']
      });
      alert.present();
       this.navCtrl.push(MysqlPage);*/


      //auto save to offline
      //this.storage.set('result',this.result);   
    }, function(err) { 
       console.log(err);
      alert('Error Connection:'+err.message); 
    
      //alert('Using Offline DB')
      //get data from DB when error internet  
    });
    this.storage.set('uname',this.uname.value);   
        
        this.navCtrl.setRoot(LoggedinPage,{
            username: this.uname.value

          });
    this.loader.dismiss();

  }

}

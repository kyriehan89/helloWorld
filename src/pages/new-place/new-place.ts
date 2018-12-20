import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {PlacesService} from '../../services/places.service';
import {PlacesPage} from '../places/places';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the NewPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-place',
  templateUrl: 'new-place.html',
})
export class NewPlacePage {
	//@ViewChild('title') title;
	location:{lat:number,lng:number} = { lat:0 , lng:0 };
	isDetected:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams
  	, private placesService:PlacesService,private geolocation: Geolocation) {
  	//this.location = { lat:0 , lng:0 };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPlacePage');
  }

  addPlace(value:{title:string}){
  	console.log('try to add place:'+value.title);


  	if(this.isDetected){
  		this.placesService.addPlace({title:value.title, location:this.location});
  		this.navCtrl.pop();	
  	}else{
  		alert('Location not found\nTry to Locate me first!');
  	}
  	
  }


  onLocateUser(){
  	this.geolocation.getCurrentPosition().then((resp) => {
	 // resp.coords.latitude
	 // resp.coords.longitude
	 this.isDetected = true;
	 console.log('location latitude:'+resp.coords.latitude);
	 console.log('location longitude:'+resp.coords.longitude);
	 this.location.lat = resp.coords.latitude;
	 this.location.lng = resp.coords.longitude;
	 alert('Location detected:'+resp.coords.latitude+","+resp.coords.longitude);

	}).catch((error) => {
	  console.log('Error getting location', error);
	});
  }

}

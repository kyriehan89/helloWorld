import { Component } from '@angular/core';
import {  ViewController,NavParams } from 'ionic-angular';
import {Place} from '../../model/place.model';
/**
 * Generated class for the PlacedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-placedetail',
  templateUrl: 'placedetail.html',
}) 
export class PlacedetailPage {
	lat:number;
	lng:number;
	//place:Place;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
  	this.lat =  this.navParams.data.location.lat;
  	this.lng =  this.navParams.data.location.lng;

  }
	
	onDismiss(){
		this.viewCtrl.dismiss();
	}

}

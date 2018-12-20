import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import {PlacesService} from '../../services/places.service';
import {NewPlacePage} from '../new-place/new-place';
import {PlacedetailPage} from '../placedetail/placedetail';
import {Place} from '../../model/place.model';
/**
 * Generated class for the PlacesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-places',
  templateUrl: 'places.html',
})
export class PlacesPage {
  places: {title: string}[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private placesService: PlacesService,private modalCtrl:ModalController) {
  }

  ionViewWillEnter(){
  	this.placesService.getPlaces().then(
  		(places)=>{
  			this.places = places
  		}

  	);
  }

  onLoadNewPlace(){
  	this.navCtrl.push(NewPlacePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesPage');
  }


  onOpenPlace(place:Place){
  console.log('open place:'+place);	
  	this.modalCtrl.create(PlacedetailPage, place).present();	
  }


}

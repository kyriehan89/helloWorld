import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform
  ) {}

  // Get permission from the user
	 async getToken() {
	 	console.log('start get token'+this.platform);
	  let token;

	  if (this.platform.is('android')) {

	    token = await this.firebaseNative.getToken()
	  } 

	  if (this.platform.is('ios')) {
	    token = await this.firebaseNative.getToken();
	    await this.firebaseNative.grantPermission();
	  } 
	  console.log('get token'+token);
	  return this.saveTokenToFirestore(token)
	}

  // Save the token to firestore
  private saveTokenToFirestore(token) {
  	 console.log('start saveTokenToFirestore'+token);
  if (!token) return;

	  const devicesRef = this.afs.collection('devices')
 console.log(' devicesRef'+devicesRef);
	  const docData = { 
	    token,
	    userId: 'testUser',
	  }

	  return devicesRef.doc(token).set(docData)
	}

  // Listen to incoming FCM messages
  listenToNotifications() {
	  return this.firebaseNative.onNotificationOpen()
	}

}
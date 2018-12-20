import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { TabsPage } from '../pages/tabs/tabs';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private push: Push) {
    platform.ready().then(() => {

       /*fcm.getToken()
       fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      )
      .subscribe()
*/
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


   
    

// OneSignal Code start:
    // Enable to debug issues:
    // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
  

    //OneSignal.setLogLevel(OneSignal.LOG_LEVEL.DEBUG, OneSignal.LOG_LEVEL.DEBUG);
    var notificationOpenedCallback = function(jsonData) {
      alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    window["plugins"].OneSignal
      .startInit("649fddd8-cfcd-4d08-b341-e38dcf7f126d", "1039097285934")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();



    this.pushSetup();
      this.push.hasPermission()
        .then((res: any) => {

          if (res.isEnabled) {
           alert('We have permission to send push notifications');
          } else {
            alert('We do not have permission to send push notifications');
          }

        });




      // to check if we have permission
      /*this.push.hasPermission()
        .then((res: any) => {

          if (res.isEnabled) {
            console.log('We have permission to send push notifications');
          } else {
            console.log('We do not have permission to send push notifications');
          }

        });
*/
      // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
      this.push.createChannel({
       id: "testchannel1",
       description: "My first test channel",
       // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
       importance: 3
      }).then(() => console.log('Channel created'));

      // Delete a channel (Android O and above)
//      this.push.deleteChannel('testchannel1').then(() => console.log('Channel deleted'));

      // Return a list of currently configured channels
      this.push.listChannels().then((channels) => console.log('List of channels', channels))

    });

  }

  pushSetup(){
       const options: PushOptions = {
       android: {
         senderID:'1039097285934'
       },
       ios: {
           alert: 'true',
           badge: true,
           sound: 'false'
       }
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
    }
}

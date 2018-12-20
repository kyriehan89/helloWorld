import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from '../pages/login/login';
import {HttpPage} from '../pages/http/http';
import {RegisterPage} from '../pages/register/register';
import {LoggedinPage} from '../pages/loggedin/loggedin';
import {ChatPage} from '../pages/chat/chat';
import {MysqlPage} from '../pages/mysql/mysql';
import { HttpClientModule } from '@angular/common/http'; 
import { IonicStorageModule } from '@ionic/storage';
import {HttpupsertPage} from '../pages/httpupsert/httpupsert';
import { HttpModule } from '@angular/http';
import {PlacesPage} from '../pages/places/places';
import {ApprovalPage} from '../pages/approval/approval';
import {CameraPage} from '../pages/camera/camera';
import {PlacedetailPage} from '../pages/placedetail/placedetail';
import {NewPlacePage} from '../pages/new-place/new-place';
import {PlacesService} from '../services/places.service';
import {UtilService} from '../services/util.service';
import {Geolocation} from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';
import {Badge} from '@ionic-native/badge';
import { Camera } from '@ionic-native/camera';
import { Push } from '@ionic-native/push';
import { FcmProvider } from '../providers/fcm/fcm';
import { Firebase } from '@ionic-native/firebase';
var config = {
    apiKey: "AIzaSyADtDIffsED0Gi1OuVM8tr527cVRKGHfMM",
    authDomain: "helloionic-38094.firebaseapp.com",
    databaseURL: "https://helloionic-38094.firebaseio.com",
    projectId: "helloionic-38094",
    storageBucket: "",
    messagingSenderId: "1039097285934"
  };



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    LoggedinPage,
    ChatPage,
    HttpPage,
    MysqlPage,
    HttpupsertPage,
    PlacesPage,
    NewPlacePage,
    PlacedetailPage,
    ApprovalPage,
    CameraPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(config),
    HttpModule,
     AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDWlS6Li5Tv-PzRKPXT0QzgiSbKMQTuwkM'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage, 
    TabsPage,
    LoginPage,
    RegisterPage,
    LoggedinPage,
    ChatPage,
    HttpPage,
    MysqlPage,
    HttpupsertPage,
    PlacesPage,
    NewPlacePage,
    PlacedetailPage,
    ApprovalPage,
    CameraPage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PlacesService,
    UtilService,
    Geolocation,
    Badge,
    Camera,
    Push,
    FcmProvider,
    Firebase
  ]
})
export class AppModule {}

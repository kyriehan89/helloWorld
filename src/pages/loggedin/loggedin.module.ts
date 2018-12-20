import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoggedinPage } from './loggedin';
//import { ChatPage } from '../chat/chat';

@NgModule({
  declarations: [
    LoggedinPage,
  ],
  imports: [
    IonicPageModule.forChild(LoggedinPage),
  ],
})
export class LoggedinPageModule {

	
}

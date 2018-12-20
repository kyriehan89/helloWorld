import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MysqlPage } from './mysql';

@NgModule({
  declarations: [
    MysqlPage,
  ],
  imports: [
    IonicPageModule.forChild(MysqlPage),
  ],
})
export class MysqlPageModule {}

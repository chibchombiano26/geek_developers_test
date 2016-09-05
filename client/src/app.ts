import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {Core} from './app/core/core';
import {ErrorPage} from './app/error/error';
import {LoginPage} from './app/login/login';
import {StorageService} from "./app/storage/storage";
import {HorizonService} from "./app/horizon/horizon";
import {PushService} from "./app/push/push.service";
declare var jQuery: any;

@Component({
  selector: 'body',
  directives: [ROUTER_DIRECTIVES],
  template: require('./app.html'),
  styles: [require('./scss/application.scss')],
  encapsulation: ViewEncapsulation.None,
  providers: [HorizonService, StorageService, PushService]
})
export class App {

    constructor(
      private horizonService: HorizonService, 
      private storageService:StorageService,
      private pushService: PushService
      ) {
        this.newNotification();
    }

    newNotification(){
      
      let user = this.storageService.getObject("user");      
      this.horizonService.horizon("Messages")
      .order("date", "descending")
      .findAll({username: user.username, active : true})
      .limit(1).watch().subscribe(msg => {
        
        if(msg.length > 0){
          let notification = msg[0];
          this.pushService.showPush(notification.message, notification.message, "http://medialoop.co.za/wp-content/themes/medialoop/images/logo.png");
          this.horizonService.horizon("Messages").store({id : notification.id, active : false, username: notification.username, date: new Date()});
        }

      });
      
    }

}

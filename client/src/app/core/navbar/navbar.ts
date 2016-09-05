import {Component, EventEmitter, OnInit, ElementRef} from '@angular/core';
import {TOOLTIP_DIRECTIVES} from 'ng2-bootstrap/ng2-bootstrap';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {ConfigService} from '../config';
import {Notifications} from '../notifications/notifications';
import {StorageService} from "../../storage/storage";
declare var jQuery: any;

@Component({
  selector: '[navbar]',
  events: ['toggleSidebarEvent', 'toggleChatEvent'],
  directives: [Notifications, TOOLTIP_DIRECTIVES, ROUTER_DIRECTIVES],
  template: require('./navbar.html'),
  providers: [StorageService]
})
export class Navbar implements OnInit {
  toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
  toggleChatEvent: EventEmitter<any> = new EventEmitter();
  $el: any;
  config: any;
  user: any = {
    name : '',
    picture: ''
  }

  constructor(el: ElementRef, config: ConfigService, private storageService:StorageService) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();    
    this.user = storageService.getObject('user');
  }

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state);
  }

  toggleChat(): void {
    this.toggleChatEvent.emit(null);
  }

  ngOnInit(): void {
    this.$el.find('.input-group-addon + .form-control').on('blur focus', function(e): void {
      jQuery(this).parents('.input-group')
        [e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
    });
  }
}

import { Injectable } from '@angular/core';
declare var Push;

@Injectable()
export class PushService {

    constructor() { }

    showPush(title:string, body: string, icon:string){

        if(!Push){
            return;
        }

        Push.create(title, {
            body: body,
            icon: icon,
            timeout: 4000,
            onClick: function () {
                window.focus();
                this.close();
            }
        });
    }

}
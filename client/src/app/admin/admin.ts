import { Component, OnInit } from '@angular/core';
import {HorizonService} from "../horizon/horizon";
import {TablesDynamic} from '../core/tables-dynamic/tables-dynamic';
declare var window; 

@Component({    
    selector: 'admin',
    template: require('./admin.html'),
    providers: [HorizonService],
    directives: [TablesDynamic],
})
export class AdminComponent implements OnInit {

    users:any = [];

    constructor(private horizonService: HorizonService) {
        this.loadData();
    }

    loadData(){
        this.horizonService.horizon("Register").watch({rawChanges: false}).subscribe(users => {
            this.users = users;
            window.Pace.stop()
        });
    }

    ngOnInit() { }
}
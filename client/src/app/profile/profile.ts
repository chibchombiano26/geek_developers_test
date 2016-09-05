import { Component, OnInit } from '@angular/core';
import {StorageService} from "../storage/storage";
import {HorizonService} from '../horizon/horizon';
import {upload} from "../core/components/upload/upload";
declare var window;

@Component({    
    selector: 'profile',
    template: require('./profile.html'),
    providers: [StorageService, HorizonService],
    directives: [upload]
})
export class ProfileComponent implements OnInit {

    user:any;
    photos: any = [];

    constructor(private horizonService: HorizonService, private storageService:StorageService) {        
        this.user =this.storageService.getObject("user");
        this.getPhotos(this.user.id);
     }

     update(){
         this.horizonService.horizon("Register").store(this.user);
     }

     getPhotos(id){         
         this.horizonService.horizon("Image_Profile").findAll({userId: id})
         .watch({rawChanges: true})
         .subscribe((newFile)=>{
             if(newFile && newFile.new_val && newFile.new_val.url){
                this.photos.push(newFile.new_val);            
            }
            window.Pace.stop()
         })
     }

    ngOnInit() { }
}
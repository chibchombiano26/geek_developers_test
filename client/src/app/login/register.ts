import { Component, OnInit } from '@angular/core';
import {HorizonService} from "../horizon/horizon";
import {Router} from '@angular/router';
import {StorageService} from "../storage/storage";

@Component({
    selector: 'register',
    template: require('./register.component.html'),
    providers: [HorizonService, StorageService]
})
export class RegisterComponent implements OnInit {
    
    active = true;

    user : any = {
        name : "",
        username : "",
        password: "",
        birth: new Date()
    };

    constructor(private horizonService: HorizonService, private _router: Router, private storageService:StorageService) {

    }

    register(){        
        this.validateExist(this.user.username).then(()=>{
            let user = this.user;
            this.horizonService.horizon("Register").store(user).subscribe((e)=>{                
                this.storageService.setObject('user', e);
                this._router.navigate(['/app/dashboard']);
            })    
        },()=>{
            alert("Exist");
        });
    }

    validateExist(username){
        let promise = new Promise((resolve, reject)=>{
            this.horizonService.horizon("Register").find({username: username}).fetch().subscribe((e)=>{
                if(e){
                    reject(e);
                }
                else{
                    resolve();
                }
            });
        });

        return promise;
    }

    ngOnInit() { 

    }
}

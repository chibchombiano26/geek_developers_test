import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HorizonService} from '../horizon/horizon';
import {Router} from '@angular/router';
import {StorageService} from "../storage/storage";
import {Auth} from '../core/auth/authservice';


@Component({
  directives: [
    ROUTER_DIRECTIVES,
  ],
  selector: '[login]',
  host: {
    class: 'login-page app'
  },
  template: require('./login.html'),
  providers: [HorizonService, StorageService, Auth]  
})
export class LoginPage {

  router: Router;

  user: any = {
    username : '',
    password: '',
    name: ''
  };

  constructor(
    _router: Router, 
    private horizonService: HorizonService, 
    private storageService:StorageService, 
    private auth: Auth) {    
     
     this.router = _router;
     
     var result = this.auth.auth0.parseHash(window.location.hash);

     if (result && result.idToken) {
        localStorage.setItem('id_token', result.idToken);
        this.saveLoginInfo(result.idToken);        
      } else if (result && result.error) {
        alert('error: ' + result.error);
      }
  }

  login(){    
    this.horizonService.horizon("Register")
    .find({username: this.user.username, password : this.user.password})    
    .fetch().subscribe((e)=>{      
      if(e){      
        this.storageService.setObject('user', e);
        this.router.navigate(['/app/dashboard']);
      }
      else{
        alert('Not found');
      }
    })
  }

  socialLogin(){    
    this.auth.login();
  }

  //Persist the user info on rethink db
  saveLoginInfo(idToken){    
    this.auth.getProfile(idToken).then((user)=>{
      
      user['id'] =  user['user_id'];
      user['username'] =  user['email'];

      this.horizonService.horizon("Register").store(user).subscribe((e)=>{
        this.storageService.setObject('user', user);
        this.router.navigate(['/app/dashboard']);
      });
    })
    
  }

}

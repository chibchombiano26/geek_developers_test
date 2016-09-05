/* ===== app/auth.service.ts ===== */
import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import {StorageService} from "../../storage/storage";

// Avoid name not found warnings
declare var Auth0Lock: any;
declare var Auth0: any;

@Injectable()
export class Auth {
  // Configure Auth0
  lock = new Auth0Lock('vDqN9QLHGSQMmf0LhrK6PvL0NmTKKixP', 'hefesoftsas.auth0.com', {
    theme: {
      logo: "http://medialoop.co.za/wp-content/themes/medialoop/images/logo.png",
      primaryColor: "#b81b1c"
    },
      languageDictionary: {
      title: "Media Loop"
    }
  });

   auth0 = new Auth0({
    domain: 'hefesoftsas.auth0.com',
    clientID: 'vDqN9QLHGSQMmf0LhrK6PvL0NmTKKixP',
    callbackOnLocationHash: true
  });
  
  userProfile: Object;

  constructor() {
        
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  };

  public getProfile(idToken){
    let promise = new Promise((res, reject) =>{
      this.lock.getProfile(idToken, (error, profile) => {
        if (error) {
          // Handle error
          reject(error);
        }

        res(profile);
    });
    })

    return promise;     
  }

  public authenticated() {
    // Check if there's an unexpired JWT
    // It searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
  };
}
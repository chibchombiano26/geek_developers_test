import {Component, Input} from '@angular/core';
import {UploadService} from './upload.service';
import {HorizonService} from "../../../horizon/horizon";
import {PushService} from "../../../push/push.service";

// const URL = '/api/';
const URL = 'http://localhost:8081/api/';

@Component({
  selector: '[upload]',  
  template: require('./upload.html'),
  providers: [ UploadService, HorizonService, PushService ]
})
export class upload {

    @Input() destination : any;
    @Input() showpush : any;
    @Input() user : any;

    constructor(
    private service:UploadService, 
    private horizonService: HorizonService, 
    private pushService: PushService) {      
      
    }

    

    onChange(event) {  
    
      var files = event.srcElement.files;    
      this.service.makeFileRequest(URL, [], files).then((e) => {
        
        if(this.user){
          this.horizonService.horizon(this.destination).store({url: e.response, userId: this.user.id});
        }
        else{
          this.horizonService.horizon(this.destination).store({url: e.response});
        }

        if(this.showpush && this.showpush == "true"){
          this.pushService.showPush("New Image", "oH Yea!", e.response);
        }

      });
  }

}
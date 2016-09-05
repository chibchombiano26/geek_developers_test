import { Component, OnInit } from '@angular/core';
import {HorizonService} from "../horizon/horizon";
import {upload} from "../core/components/upload/upload";
declare var window;

@Component({    
    selector: 'feed',
    template: require('./feed.html'),
    directives: [upload],
    providers: [HorizonService]        
})
export class FeedComponent implements OnInit {

    images : any = [];

    constructor(private horizonService: HorizonService) {
        this.onNewImage();        
    }

    onNewImage(){      
      this.horizonService.horizon("Images").watch({rawChanges: true}).subscribe(newFile => {

                    
          if(newFile && newFile.new_val && newFile.new_val.url){
            this.images.push(newFile.new_val);            
          }

          window.Pace.stop()
      });
    }

    ngOnInit() { }
}
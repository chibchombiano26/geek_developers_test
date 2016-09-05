import { Component, OnInit } from '@angular/core';
declare var gifshot; 
declare var jQuery: any;

@Component({    
    selector: 'media',
    template: require('./media.html')
})
export class MediaComponent implements OnInit {

    item:any = {
        image : ''
    };

    ctx:any = {};
    img:any = {};

    constructor() { }

    takeSnapShot(){
        let item = this.item;
        let _canvas = this.canvas;
        let that = this;
        gifshot.takeSnapShot({text: '#GeekDevelopers'}, function (obj) {            
            if (!obj.error) {
                
                let img = new Image();
                img.onload = function(){
                    _canvas(img, that);
                };
                img.src = obj.image;                
            }
        });
    }

    canvas(image, that){                        
        
        let context = jQuery(".gdCanvas")[0].getContext('2d');        
        context.drawImage(image, 0, 0);

        that.ctx= context;
        that.img = image;
    }

    grayScale(){
        let image = this.img;
        var imageData = this.ctx.getImageData(0, 0, image.width, image.height);
        var data = imageData.data;

        for(var i = 0; i < data.length; i += 4) {
          var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
          // red
          data[i] = brightness;
          // green
          data[i + 1] = brightness;
          // blue
          data[i + 2] = brightness;
        }

        // overwrite original image
        this.ctx.putImageData(imageData, 0, 0);
    }

    ngOnInit() { }
}
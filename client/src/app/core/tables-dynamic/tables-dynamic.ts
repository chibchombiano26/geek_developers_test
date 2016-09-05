import {Component, ViewEncapsulation, Input, OnChanges, OnInit} from '@angular/core';
import {Widget} from '../../core/widget/widget';
import {DataTableDirectives} from 'angular2-datatable/datatable';
import {SearchPipe} from './pipes/search-pipe';
import * as _ from 'lodash';
import {StorageService} from "../../storage/storage";
import {HorizonService} from "../../horizon/horizon";
declare var jQuery: any;
declare var jsPDF: any;

@Component({
  selector: '[tables-dynamic]',
  template: require('./tables-dynamic.html'),
  encapsulation: ViewEncapsulation.None,
  directives: [Widget, DataTableDirectives],
  styles: [require('./tables-dynamic.scss')],
  pipes: [SearchPipe],
  inputs:['source', 'change'],
  providers: [HorizonService, StorageService]
})
export class TablesDynamic implements OnChanges, OnInit {
    data: any[] = [];
    @Input() source : any;
    @Input() change : any;

  
  constructor(private horizonService: HorizonService, private storageService:StorageService) {    
  }

  ngOnInit(): void {
    let searchInput = jQuery('#table-search-input, #search-countries');
    searchInput
      .focus((e) => {
      jQuery(e.target).closest('.input-group').addClass('focus');
    })
      .focusout((e) => {
      jQuery(e.target).closest('.input-group').removeClass('focus');
    });
  }

  createTable(data){
    this.data = data;
  }

  csv(){
    
    let dataString = "";  
    let csvContent = this.csvToArray(this.data, ",", true, true);
    
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  pdf(){    
    var doc = new jsPDF();
    doc.setFontSize(8);
    let csvContent = this.csvToArray(this.data, "\t", false, false);
    doc.text(10, 10, csvContent);
    doc.save('users.pdf');
  }

  csvToArray(array, separator, type, includeHeaders) {
    // Use first element to choose the keys and the order
    let keys = Object.keys(array[0]);
    let result = "";

    if(type){
      result = "data:text/csv;charset=utf-8,";  
    }    

    // Build header

    if(includeHeaders){
      result += keys.join(separator) + "\n";
    }
    
    // Add the rows
    array.forEach(function(obj){
        keys.forEach(function(k, ix){
            if (ix) result += separator;
            result += obj[k];
        });
        result += "\n";
    });

    return result;
  }

  ngOnChanges(changes) {    
    if(changes.source && changes.source.currentValue){
      this.createTable(changes.source.currentValue);
    }
  }

  message(item){
            
      this.horizonService.horizon("Messages")
      .store({username: item.username, message : 'Say Hello', date : new Date(), active: true})
      .subscribe(msg => {
          console.log(msg);
      });

  }

}

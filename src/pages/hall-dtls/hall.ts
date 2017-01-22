import { Component, Input, ViewChild } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { HallService } from '../../services/HallService'

@Component({
  selector: 'page-hall',
  templateUrl: 'hall.html',
  providers: [HallService]
})
export class HallPage {
	@Input() id:string;
  @Input() title:string;
	hallResult:any;
  img : any;
  @ViewChild('HallSlider') hallSlider : Slides;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public hallService: HallService, private sanitizer: DomSanitizer) {
  	console.log("constructor :.............",this.navParams.get('id'));
    this.title = this.navParams.get('title');
  	this.id = this.navParams.get('id');
  	this.getHallDetails();
    //this.doThis();
  }
  
  nextImg(){
    //alert('ABC');
      
      //this.hallSlider.rapidUpdate();
      //What should i do in this method?
  }
  getHallDetails(){
  	this.hallService.getHallDtls(this.id).subscribe(
        data => {
        console.log('data...............',data.imgUrls);
        	this.img = data.imgUrls;
          //this.hallResult = this.sanitizer.bypassSecurityTrustStyle('url(' + data.imgUrl + ')');//data;
            
          //this.img = this.sanitizer.bypassSecurityTrustUrl(data.imgUrl);
                        
        },
        err => {
            console.log(err);
        },
        () => console.log('Search Complete')
    );
  }

}

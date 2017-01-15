import { Component, Input } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { NavController, NavParams } from 'ionic-angular';
import { HallService } from '../../services/HallService'

@Component({
  selector: 'page-hall',
  templateUrl: 'hall.html',
  providers: [HallService]
})
export class HallPage {
	@Input() id:string;
	hallResult:any;
  img : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public hallService: HallService, private sanitizer: DomSanitizer) {
  	console.log("constructor :.............",this.navParams.get('id'));
  	this.id = this.navParams.get('id');
  	this.getHallDetails();
  }

  getHallDetails(){
  	this.hallService.getHallDtls(this.id).subscribe(
        data => {
        	this.hallResult = this.sanitizer.bypassSecurityTrustStyle('url(' + data.imgUrl + ')');//data;
            
          this.img = this.sanitizer.bypassSecurityTrustUrl(data.imgUrl);
                        
        },
        err => {
            console.log(err);
        },
        () => console.log('Search Complete')
    );
  }

}

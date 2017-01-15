import { Component, Input } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'header-page',
  templateUrl: 'header.html'

})
export class Header {
	@Input() title:string;
  constructor(public navCtrl: NavController) {

  }

}

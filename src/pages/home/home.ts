import { Component, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HomeService } from '../../services/HomeService';
import {DomSanitizer} from '@angular/platform-browser';
import { Geolocation } from 'ionic-native';
//import { Header } from '../header/header';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {
	areaName: String = 'area name...';
 	hallResult:[any];
 	myDate: String = new Date().toISOString();

  constructor(public navCtrl: NavController, public homeService: HomeService, private sanitizer: DomSanitizer, public platform: Platform, public zone: NgZone) {
  	this.platform = platform;
  	this.getArea = this.getArea.bind( this )
  	this.codeLatLng = this.codeLatLng.bind( this )
  }

  ionViewDidLoad() {
  	this.getArea();
  	//this.searchHalls();
  }

  searchHalls(){
  	/*console.log((<HTMLInputElement>document.getElementById("date")).value);
    console.log((<HTMLInputElement>document.getElementById("areaName")).value);*/
    //this.areaName = document.getElementById("areaName").innerHTML;
    console.log('area:::: ',this.areaName);
    console.log('date:::: ',this.myDate);

    this.homeService.searchHall(this.areaName).subscribe(
        data => {
        	console.log('data ::::::',data);
            this.hallResult = data;
            this.hallResult.forEach((hall) =>{  // foreach statement
            	hall.image = this.sanitizer.bypassSecurityTrustStyle('url(' + hall.image + ')');
            	console.log(" hall ::::=:"+hall.image);
            })
                        
        },
        err => {
            console.log(err);
        },
        () => console.log('Search Complete')
    );
   //this.getArea();
  }
  setArea(event, searchKey){
  	console.log('searchKey:::::::::::',event.target.value);
  	this.areaName = event.target.value;
  }

  getArea(){
	  
  	Geolocation.getCurrentPosition().then((position) => {
		
		let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	    			
		//this.getGeocoder(latLng);
		this.codeLatLng(function(addr){
		    
			var value=addr.split(",");
			var count=value.length;
			console.log('location:::::',value[count-4]);
			this.areaName = value[count-4];
			this.searchHalls();
		  }.bind(this), latLng);
		
	    }, (err) => {
	      console.log(err);
	    });
  }

  getGeocoder(latLng){
  	var geocoder;
	geocoder = new google.maps.Geocoder();
  		var count;
		var country;
		var state;
		var city;
		var locName;
  	geocoder.geocode(
    	{'latLng': latLng}, 
    	function(results, status) {
    	   	if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add= results[0].formatted_address ;
                    var  value=add.split(",");
                   
                    count=value.length;
                    country=value[count-1];
                    state=value[count-2];
                    city=value[count-3];
                    locName = value[count-4];
                    console.log('locName:::::::',locName);
                    document.getElementById("areaName").innerHTML = locName;
                }
                else  {
                    alert("address not found");
                }
        	}
     		else {
        		alert("Geocoder failed due to: " + status);
    	}
	});
  }
  
  codeLatLng(callback, latlng){
  	var geocoder;
	geocoder = new google.maps.Geocoder();
   geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          callback(results[0].formatted_address);
        } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
  }  

}

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
export class HomeService {  
    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http) {
         
    }
  	searchHall(location) {
    console.log('location:::',location);
        //var url = 'http://183.83.167.51:9020/my-events-server/search';
        //var url = 'http://192.168.1.5:9020/my-events-server/search';
        var url = 'http://localhost:9020/my-events-server/search';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }

    getImages() {
    console.log('images :::');
        var url = 'http://192.168.1.5:9020/my-events-server/getImage';
        //var url = 'http://183.83.133.99:9020/my-events-server/getImage';
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
    
}
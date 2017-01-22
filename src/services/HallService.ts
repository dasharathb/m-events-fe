import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
  
export class HallService {  
    static get parameters() {
        return [[Http]];
    }
  
    constructor(private http:Http) {
         
    }
  	getHallDtls(hallId) {
    
        //var url = 'http://183.83.167.51:9020/my-events-server/buildUrl/'+hallId;
        //var url = 'http://192.168.1.5:9020/my-events-server/buildUrl/'+hallId;
        var url = 'http://localhost:9020/my-events-server/buildUrl/'+hallId;
        var response = this.http.get(url).map(res => res.json());
        return response;
    }
    
}
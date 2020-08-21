import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class UserService {

    public static BaseUrl = "http://localhost:6565/";

    constructor(private http: HttpClient) { }
    postfitnessdata(data: Object){
      return this.http.post(UserService.BaseUrl+'allfriends',data);
    }
    
    updatefitnessdata(data: Object, id: number){
      return this.http.put(UserService.BaseUrl+'allfriends/'+id, data);
    }

    getfitnessdata() {
      return this.http.get(UserService.BaseUrl+'allfriends');
    }
    
    getUserData(id: number) {
      return this.http.get(UserService.BaseUrl+'allfriends/'+id);
    }

    deleteData(id: number) {
      return this.http.delete(UserService.BaseUrl+'allfriends/'+id).subscribe(data => {
        console.log(data);
      });
    }
}
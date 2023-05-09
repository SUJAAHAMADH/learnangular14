import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient:HttpClient) { }
  apiUrl = 'http://localhost:3000/user';

  getAll(){
    return this.httpclient.get(this.apiUrl);
  }

  GetUserbyCode(id:any){
    return this.httpclient.get(this.apiUrl+'/'+id);
  }

  proceedRegister(inputData:any){
    return this.httpclient.post(this.apiUrl,inputData);
  }

  updateUser(code:any,inputData:any){
    return this.httpclient.put  (this.apiUrl+'/'+code,inputData);
  }

  isloggedin(){
    return sessionStorage.getItem('username')!=null;
  }
}

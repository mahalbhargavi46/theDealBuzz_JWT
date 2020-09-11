import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { subscribeOn } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string;

  constructor(private _http: HttpClient) { }

  getToken(){
    return this.token;
  }

  register(body:any){
    return this._http.post('http://127.0.0.1:3000/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  login(credentials){
    const authData: User={email:email, password:password };
    this._http.post<{token: string}>('http://127.0.0.1:3000/login',authData)
    .subscribe(response => {
      // console.log(response);
      const token = response.token;
      this.token=token;
    });
  }
  user(){
    return this._http.get('http://127.0.0.1:3000/admin',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  logout(){
    return this._http.get('http://127.0.0.1:3000/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
}

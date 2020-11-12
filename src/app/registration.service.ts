import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http'
import { FormControl, FormGroup } from '@angular/forms';
import { User } from './user';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  _user = new User();
  constructor(private http:HttpClient) { }
  public loginUserFromRemote(user:User):Observable<any>{
    return this.http.post<any>("http://localhost:8080/api/login",user)
  }

  public registerUserFromRemote(user:FormGroup):Observable<any>{
    this._user.firstName = user.get("firstName").value;
    this._user.lastName = user.get("lastName").value;
    this._user.email = user.get("email").value;
    this._user.password = user.get("password").value;
    return this.http.post<any>("http://localhost:8080/api/register",this._user)
  }

  public editUserFromRemote(user:FormGroup,user2:User):Observable<any>{
    this._user.firstName = user.get("firstName").value;
    this._user.lastName = user.get("lastName").value;
    this._user.email = user2.email;
    this._user.password = user.get("password").value;
    this._user.id = user2.id;
    return this.http.post<any>("http://localhost:8080/api/save",this._user)
  }

  public fetchUserListFromRemote():Observable<any>{
    return this.http.get<any>("http://localhost:8080/api/findAll")
  }
  public deleteUserListbyIdFromRemote(user:Number):Observable<any>{
    return this.http.delete<any>("http://localhost:8080/api/delete/"+user);
  }
  public fetchUserListbyIdFromRemote(id:Number):Observable<any>{
    return this.http.get("http://localhost:8080/api/findById/"+id);
}


}

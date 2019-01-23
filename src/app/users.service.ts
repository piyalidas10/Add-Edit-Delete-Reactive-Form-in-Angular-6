import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'userlist';
  constructor(private http: HttpClient) {}

  setUsersList(users: any): Observable<any> {
    return this.http.post(this.url, users, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

}

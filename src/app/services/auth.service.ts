import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl =  environment.baseUrl;

  constructor(private httpClient: HttpClient) { }
  authenticate(email, password) {
    return this.httpClient.post<{ token: string }>(this.baseUrl + '/login'
      , { email, password }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      , { headers: new HttpHeaders({ 'No-Auth': 'True' }) }
    );
  }
  singup(user, email, password) {
    return this.httpClient.post<{ id: string }>(this.baseUrl + '/register'
      , { user, email, password }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      , { headers: new HttpHeaders({ 'No-Auth': 'True' }) }
    );
  }

}

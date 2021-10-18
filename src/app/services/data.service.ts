import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { IProfile } from '../components/interfaces/profile.interface';
import { INewLink } from '../components/interfaces/newlink.interface';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {

  }


  getUser(id) {
    return this.httpClient.get<IProfile>(this.baseUrl + '/user/' + id);
  }
  createLink(data){
    return this.httpClient.post<INewLink>(this.baseUrl + '/links', data ,{ responseType: 'text' as 'json' });
  }
  getAllLinks(){
    return this.httpClient.get<any>(this.baseUrl + '/links', { responseType: 'text' as 'json' });
  }
  deleteLink(id){
    return this.httpClient.delete<INewLink>(this.baseUrl + '/links/'+ id, { responseType: 'text' as 'json' });
  }
}

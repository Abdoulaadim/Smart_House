import { House } from 'src/app/models/house';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Floor } from '../models/floor';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FloorService extends DataService {

  constructor(http: HttpClient,private httpclient: HttpClient) {
    super('http://localhost:5000/floors', http);
   }

  // urlAPI = "http://localhost:5000/floors";


  //  getAll(){
  //    return this.httpclient.get<Floor[]>(`${this.urlAPI}?_expand=house`)
  //  }
}

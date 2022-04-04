import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends DataService {

  constructor(http: HttpClient) {
    super('http://localhost:5000/Room', http);
   }
}

import { Component, OnInit } from '@angular/core';
import { AppError } from 'src/app/common/app-error';
import { BadInput } from 'src/app/common/bad-input';
import { NotFoundError } from 'src/app/common/not-found-error';
import { Device } from 'src/app/models/device';
import { Room } from 'src/app/models/room';
import { DeviceService } from 'src/app/services/device.service';
import { RoomService } from 'src/app/services/room.service';


@Component({
  selector: 'device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  statuss : boolean =true;
  devices : Device[] = [];
  device : Device = {};
  room:Room;
  roomes : Room[] = [];

  constructor(private deviceService: DeviceService , private roomService: RoomService) { }

  ngOnInit(): void {
    this.getDevices();
  }


  changeStatus(device :any){

    this.device = device;
    
    if(this.device.status === "ON"){
      //this.device.status =  "OFF";

      this.deviceService.update(this.device)
          .subscribe(()=>{
            this.device.status ="OFF";
            
          })
      
          
    }
    else {
      this.deviceService.update(this.device)
          .subscribe(()=>{
             this.device.status ="ON";
        
           })
      

    }
  }


  // updateData(value: any) {
  //   let body = {
  //     name: value.name,
  //     age: value.age
  //   }

  //   this.userService.updateData(body, `622ca8c59f6c668226f74f52`)
  //     .subscribe(response => {
  //       console.log(response)
  //     })
  // }

  


  getDevices(){
    this.roomService.getALL()
    .subscribe(roomes => this.roomes = roomes,
        error => {
        alert('error inattendu');
        console.log(error);
    })

    this.deviceService.getALL()
      .subscribe(devices => this.devices = devices,
          error => {
          alert('error inattendu');
          console.log(error);
      })
    }

  createDevice(){
      this.device.room=this.room;
      this.deviceService.create(this.device)
        .subscribe(newDevice => {
        this.device.id = +newDevice;
        this.devices.unshift(this.device); // ajouter en premier
        //initialisation input 
        this.device ={    
          name :''
        };
      },(error : AppError) => {
        
        if(error instanceof BadInput) {
          alert('Merci de vérifié vos information !! ')
        }else{
          alert('error inattendu');
        }
      })
  
  }

  editPost(device : any){
    this.device = device;
    this.statuss =false;
  }

  updateDevice(){
    // this.postService.updatePost(this.post)
    this.device.room=this.room;
    this.deviceService.update(this.device)
      .subscribe(() => {
        this.device  = {
            name : "",
          
        };

      },(error : AppError) => {
        if(error instanceof BadInput) {
          alert('Merci de vérifié vos information !! ')
        }else{
          alert('error inattendu');
        }
      })
      this.statuss =true;
  }

  Delete(device : any ){

    if(confirm("tu veux le supprimer ")) {
      this.device.room=this.room;
    this.deviceService.delete(device)
      .subscribe(() => {
        let index  = this.devices.indexOf(device);
        this.devices.splice(index, 1)
      },(error : AppError)  => {
        if(error instanceof NotFoundError) {
          alert('Ce message est déjà supprimé !! ')
        }else{
          alert('error inattendu');
          console.log(error)
        }
      })
      
    }
  }

}

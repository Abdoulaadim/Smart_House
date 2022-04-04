import { Component, OnInit } from '@angular/core';
import { AppError } from 'src/app/common/app-error';
import { BadInput } from 'src/app/common/bad-input';
import { NotFoundError } from 'src/app/common/not-found-error';
import { Floor } from 'src/app/models/floor';
import { Room } from 'src/app/models/room';
import { FloorService } from 'src/app/services/floor.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(private roomService: RoomService , private floorService: FloorService) { }

  ngOnInit(): void {
    this.getRoomes();
  }

  statuss : boolean =true;

  floores : Floor[] = [];
  roomes : Room[] = [];
  room : Room = {};
  floore:Floor;


  getRoomes(){


    this.floorService.getALL()
    .subscribe(floores => this.floores = floores,
        error => {
        alert('error inattendu');
        console.log(error);
        

    })


    this.roomService.getALL()
      .subscribe(roomes => this.roomes = roomes,
          error => {
          alert('error inattendu');
          console.log(error);
          

      })
    }

    createRoom(){
      this.room.floor=this.floore;
      this.roomService.create(this.room)
        .subscribe(newRoom => {
        this.room.id = +newRoom;
        this.roomes.unshift(this.room);
        this.room ={    
          number : 0
        };
      },(error : AppError) => {
        
        if(error instanceof BadInput) {
          alert('Merci de vérifié vos information !! ')
        }else{
          alert('error inattendu');
        }
      })
  
  }

  
    editRoom(room : any){

      this.room = room;
      this.statuss =false;
      
    }
  
    updateRoom(){
      // this.postService.updatePost(this.post)*

      this.room.floor=this.floore;
      this.roomService.update(this.room)
        .subscribe(() => {
          this.room ;
        },(error : AppError) => {
          if(error instanceof BadInput) {
            alert('Merci de vérifié vos information !! ')
          }else{
            alert('error inattendu');
          }
        })
        this.statuss =true;
    }
  
    DeleteRoom(room : any ){
  
      if(confirm("tu veux le supprimer ")) {
        this.room.floor=this.floore;
      this.roomService.delete(room)
        .subscribe(() => {
          let index  = this.roomes.indexOf(room);
          this.roomes.splice(index, 1)
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

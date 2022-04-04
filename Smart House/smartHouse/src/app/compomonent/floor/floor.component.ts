import { Component, OnInit } from '@angular/core';
import { AppError } from 'src/app/common/app-error';
import { BadInput } from 'src/app/common/bad-input';
import { NotFoundError } from 'src/app/common/not-found-error';
import { Floor } from 'src/app/models/floor';
import { House } from 'src/app/models/house';
import { FloorService } from 'src/app/services/floor.service';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-floor',
  templateUrl: './floor.component.html',
  styleUrls: ['./floor.component.css']
})
export class FloorComponent implements OnInit {

  constructor(private floorService: FloorService,private houseService: HouseService) { }

  ngOnInit(): void {
    this.getFloores();
    // this.getHousesSelect();
  }

  statuss : boolean =true;

  houses : House []  =[];
  floores : Floor[] = [];
  // HouseT?: House={
  //   name: '',
  //   address: '',
  // }
  floor : Floor = {};
  house:House;


  // getHousesSelect(){
  //   this.houseService.getALL()
  //     .subscribe(houses => this.houses = houses,
  //         error => {
  //         alert('error inattendu');
  //         console.log(error);
          

  //     })
  //   }



    getFloores(){

      this.houseService.getALL()
      .subscribe(houses => this.houses = houses,
          error => {
          alert('error inattendu');
          console.log(error);
          

      })

      this.floorService.getALL()
        .subscribe(floores => this.floores = floores,
            error => {
            alert('error inattendu');
            console.log(error);
            
  
        })

        
      }



    createFloor(){
      this.floor.house=this.house;
      this.floorService.create(this.floor)
        .subscribe(newFloor => {
        this.floor.id = +newFloor;
        this.floores.unshift(this.floor);
        this.floor ={    
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

  
    editFloor(floor : any){

      this.floor = floor;
      this.statuss =false;
      
    }
  
    updateFloor(){
      this.floor.house=this.house;
      // this.postService.updatePost(this.post)
      this.floorService.update(this.floor)
        .subscribe(() => {
          this.floor ;
        },(error : AppError) => {
          if(error instanceof BadInput) {
            alert('Merci de vérifié vos information !! ')
          }else{
            alert('error inattendu');
          }
        })
        this.statuss =true;
    }
  
    DeleteFloor(floor : any ){
  
      if(confirm("tu veux le supprimer ")) {
      this.floor.house=this.house;
      this.floorService.delete(floor)
        .subscribe(() => {
          let index  = this.floores.indexOf(floor);
          this.floores.splice(index, 1)
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

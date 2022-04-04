import { Component, OnInit } from '@angular/core';
import { AppError } from 'src/app/common/app-error';
import { BadInput } from 'src/app/common/bad-input';
import { NotFoundError } from 'src/app/common/not-found-error';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/services/house.service';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {
  constructor(private houseService: HouseService) { }

  ngOnInit(): void {
    this.getHouses();
  }

  statuss : boolean =true;

  houses : House[] = [];
  house : House = {
    name: ''
  };



  getHouses(){
    this.houseService.getALL()
      .subscribe(houses => this.houses = houses,
          error => {
          alert('error inattendu');
          console.log(error);
          

      })
    }

    createHouse(){
      this.houseService.create(this.house)
        .subscribe(newHouse => {
        this.house.id = +newHouse;
        this.houses.unshift(this.house);
        this.house ={    
          name : '',
          address :''
        };
      },(error : AppError) => {
        
        if(error instanceof BadInput) {
          alert('Merci de vérifié vos information !! ')
        }else{
          alert('error inattendu');
        }
      })
  
  }

  
    editHouse(house : any){

      this.house = house;
      this.statuss =false;
      
    }
  
    updateHouse(){
      // this.postService.updatePost(this.post)
      this.houseService.update(this.house)
        .subscribe(() => {
          this.house ;
        },(error : AppError) => {
          if(error instanceof BadInput) {
            alert('Merci de vérifié vos information !! ')
          }else{
            alert('error inattendu');
          }
        })
        this.statuss =true;
    }
  
    DeleteHouse(house : any ){
  
      if(confirm("tu veux le supprimer ")) {
  
      this.houseService.delete(house)
        .subscribe(() => {
          let index  = this.houses.indexOf(house);
          this.houses.splice(index, 1)
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

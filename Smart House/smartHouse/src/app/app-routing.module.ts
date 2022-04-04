import { FloorComponent } from './compomonent/floor/floor.component';
import { RoomComponent } from './compomonent/room/room.component';
import { DeviceComponent } from './compomonent/device/device.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseComponent } from './compomonent/house/house.component';

const routes: Routes = [
  {
        path: "device",
        component: DeviceComponent
  },
  {     path: "room",
        component:RoomComponent
  },
  {     path: "floor",
        component:FloorComponent
  },
  {     path: "house",
        component:HouseComponent
  },
  // {     path: "house",
  //       component:HouseComponent
  // }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

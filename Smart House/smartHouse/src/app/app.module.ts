import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './compomonent/navbar/navbar.component';
import { FloorComponent } from './compomonent/floor/floor.component';
import { RoomComponent } from './compomonent/room/room.component';
import { DeviceComponent } from './compomonent/device/device.component';
import { UserComponent } from './compomonent/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { NotFoundErrorComponent } from './compomonent/not-found-error/not-found-error.component';
import { HouseComponent } from './compomonent/house/house.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FloorComponent,
    RoomComponent,
    DeviceComponent,
    UserComponent,
    NotFoundErrorComponent,
    HouseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

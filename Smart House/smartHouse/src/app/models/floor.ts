import { Device } from "./device";
import { House } from "./house";
import { Room } from "./room";

export interface Floor{
    id?: number;
    number?: number;
    // id_house?:number;
    house?: House;
    room?:Room[] ;
    device?: Device [];
    
}

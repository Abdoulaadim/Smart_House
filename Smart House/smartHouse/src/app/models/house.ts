import { Device } from "./device";
import { Floor } from "./floor";

export interface House {
    id?:number;
    name?:string;
    address?:string;
    floors?:Floor[] ;
    device?: Device []; 
  
}

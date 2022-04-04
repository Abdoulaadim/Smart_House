import { Floor } from "./floor";
import { House } from "./house";
import { Room } from "./room";

export interface Device {

    id? : number;
    status? :status|any;
    name? :string;
    floor?: Floor;
    room?: Room;
    house?: House;

}

enum status{
    On,Off

}

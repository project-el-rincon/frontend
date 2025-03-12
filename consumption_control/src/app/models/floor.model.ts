import { Room } from "./room.model";

export interface Floor {
    id: number;
    name: string;
    level: number;
    rooms: Room[];
}
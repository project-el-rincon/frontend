import { Room } from "./room.model";

export interface Floor {
    id: number;
    name: string;
    gridRows: number;
    gridCols: number;
    rooms: Room[];
}
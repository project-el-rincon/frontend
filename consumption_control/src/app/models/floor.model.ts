import { Room } from "./room.model";

export interface Floor {
    id: number;
    name: string;
    gridRows: number; // Ajouter ces propriétés
    gridCols: number;
    rooms: Room[];
}
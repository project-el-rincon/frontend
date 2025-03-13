import { Component, Input, OnChanges } from '@angular/core';
import { Floor } from '../../models/floor.model';
import { Room } from '../../models/room.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-map',
  imports: [CommonModule, RouterLink, MatTooltipModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnChanges{
  @Input() floor!: Floor;

  
  // Ceci est une représentation très simplifiée
  // Dans un vrai projet, on pourrait avoir des coordonnées plus précises pour chaque salle
  gridRows = 4;
  gridCols = 5;
  roomsGrid: (Room | null)[][] = [];
  clearHighlight: any;
  
  // map.component.ts
ngOnChanges(): void {
  if (this.floor) {
    this.gridRows = this.floor.gridRows;
    this.gridCols = this.floor.gridCols;
    this.initializeGrid();
    this.placeRoomsOnGrid();
  }
}
  
  private initializeGrid(): void {
    this.roomsGrid = [];
    for (let i = 0; i < this.gridRows; i++) {
      const row: (Room | null)[] = [];
      for (let j = 0; j < this.gridCols; j++) {
        row.push(null);
      }
      this.roomsGrid.push(row);
    }
  }
  
  // map.component.ts
private placeRoomsOnGrid(): void {
  if (!this.floor?.rooms) return;

  // Réinitialiser la grille
  this.initializeGrid();

  // Placer les salles selon leurs coordonnées
  this.floor.rooms.forEach(room => {
    if (room.row < this.gridRows && room.col < this.gridCols) {
      this.roomsGrid[room.row][room.col] = room;
    }
  });
}

highlightRoom(roomId: number): void {
  // Implémentez la logique de surbrillance ici
  console.log('Hightlight room:', roomId);
  // Ex: document.querySelector(`[data-room="${roomId}"]`)?.classList.add('highlighted');
}
}


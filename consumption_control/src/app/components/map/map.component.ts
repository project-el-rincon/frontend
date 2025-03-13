import { Component, Input, OnChanges } from '@angular/core';
import { Floor } from '../../models/floor.model';
import { Room } from '../../models/room.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-map',
  imports: [CommonModule, RouterLink],
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
  
  ngOnChanges(): void {
    this.initializeGrid();
    this.placeRoomsOnGrid();
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
  
  private placeRoomsOnGrid(): void {
    // Dans un vrai projet, les positions viendraient du backend
    // Ici, on place les salles aléatoirement comme exemple
    if (!this.floor?.rooms?.length) return;
    
    let roomIndex = 0;
    for (let i = 0; i < this.gridRows && roomIndex < this.floor.rooms.length; i++) {
      for (let j = 0; j < this.gridCols && roomIndex < this.floor.rooms.length; j++) {
        // On laisse quelques cases vides pour simuler des couloirs
        if (Math.random() > 0.3) {
          this.roomsGrid[i][j] = this.floor.rooms[roomIndex++];
        }
      }
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { Floor } from '../../models/floor.model';
import { FloorService } from '../../services/floor.service';
import { MapComponent } from '../../components/map/map.component';
import { RoomCardComponent } from '../../components/room-card/room-card.component';

@Component({
  selector: 'app-home',
  imports: [MapComponent, RoomCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  floors: Floor[] = [];
  selectedFloor: Floor | null = null;

  constructor(private floorService: FloorService) {}

  ngOnInit(): void {
    this.loadFloors();
  }

  loadFloors(): void {
    this.floorService.getFloors().subscribe(floors => {
      this.floors = floors;
      // Sélectionner par défaut le premier étage
      if (floors.length > 0 && !this.selectedFloor) {
        this.selectFloor(floors[0].id);
      }
    });
  }

  selectFloor(floorId: number): void {
    this.floorService.getFloorById(floorId).subscribe(floor => {
      this.selectedFloor = floor !;
    });
  }
}

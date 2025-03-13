import { Component, OnInit } from '@angular/core';
import { Floor } from '../../models/floor.model';
import { FloorService } from '../../services/floor.service';
import { MapComponent } from '../../components/map/map.component';
import { RoomCardComponent } from '../../components/room-card/room-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RoomCardComponent, MapComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  floors: Floor[] = [];
  selectedFloor?: Floor;
  loading = true;
  error: string | null = null;

  constructor(private floorService: FloorService) {}

  ngOnInit(): void {
    this.loadFloors();
  }

  loadFloors(): void {
    this.loading = true;
    this.error = null;
    
    this.floorService.getFloors().subscribe({
      next: (floors) => {
        this.floors = floors;
        if (floors.length > 0 && !this.selectedFloor) {
          this.selectFloor(floors[0]);
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des étages';
        this.loading = false;
        console.error('Erreur de chargement:', err);
      }
    });
  }

  selectFloor(floor: Floor): void {
    if (this.selectedFloor?.id !== floor.id) {
      this.selectedFloor = floor;
    }
  }
}

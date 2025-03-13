import { Component, Input } from '@angular/core';
import { Room } from '../../models/room.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-room-card',
  imports: [NgClass],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.css'
})
export class RoomCardComponent {
  @Input()
  room!: Room;
}

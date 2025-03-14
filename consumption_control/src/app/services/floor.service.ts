import { Injectable } from '@angular/core';
import { Floor } from '../models/floor.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  private floors: Floor[] = [
    {
      id: 1,
      name: 'Ground floor',
      gridRows: 1,
      gridCols: 5,
      rooms: [
        {
          id: 1,
          name: 'Room 1',
          row: 0,
          col: 0,
          currentPower: 750,
          currentTemperature: 22
        },
        {
          id: 2,
          name: 'Room 2',
          row: 0,
          col: 1,
          currentPower: 500,
          currentTemperature: 25
        },
        {
          id: 3,
          name: 'Room 3',
          row: 0,
          col: 2,
          currentPower: 400,
          currentTemperature: 23
        }
      ]
    },
    {
      id: 2,
      name: '1st floor',
      gridRows: 1,
      gridCols: 5,
      rooms: [
        {
          id: 4,
          name: 'Room 4',
          row: 0,
          col: 0,
          currentPower: 1200,
          currentTemperature: 21
        },
        {
          id: 5,
          name: 'Room 5',
          row: 0,
          col: 1,
          currentPower: 900,
          currentTemperature: 24
        },
        {
          id: 6,
          name: 'Room 6',
          row: 0,
          col: 2,
          currentPower: 600,
          currentTemperature: 22
        }
      ]
    },
    {
      id: 3,
      name: '2nd floor',
      gridRows: 1,
      gridCols: 5,
      rooms: [
        {
          id: 7,
          name: 'Room 7',
          row: 0,
          col: 0,
          currentPower: 450,
          currentTemperature: 23
        },
        {
          id: 8,
          name: "Room 8",
          row: 0,
          col: 1,
          currentPower: 350,
          currentTemperature: 22
        },
        {
          id: 9,
          name: 'Room 9',
          row: 0,
          col: 2,
          currentPower: 800,
          currentTemperature: 21
        }
      ]
    }
  ];

  getFloors(): Observable<Floor[]> {
    return of(this.floors);
  }

  getFloorById(id: number): Observable<Floor | undefined> {
    return of(this.floors.find(floor => floor.id === id));
  }
}

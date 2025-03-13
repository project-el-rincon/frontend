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
      name: 'Rez-de-chaussée',
      gridRows: 4,
      gridCols: 5,
      rooms: [
        {
          id: 101,
          name: 'Salle de classe A1',
          row: 0,
          col: 0,
          currentPower: 750,
          currentTemperature: 22
        },
        {
          id: 102,
          name: 'Salle de bureau B2',
          row: 0,
          col: 1,
          currentPower: 500,
          currentTemperature: 25
        },
        {
          id: 103,
          name: 'Café C3',
          row: 0,
          col: 2,
          currentPower: 400,
          currentTemperature: 23
        }
      ]
    },
    {
      id: 2,
      name: '1er étage',
      gridRows: 4,
      gridCols: 5,
      rooms: [
        {
          id: 201,
          name: 'Laboratoire L1',
          row: 0,
          col: 0,
          currentPower: 1200,
          currentTemperature: 21
        },
        {
          id: 202,
          name: 'Salle informatique I2',
          row: 0,
          col: 1,
          currentPower: 900,
          currentTemperature: 24
        },
        {
          id: 203,
          name: 'Bibliothèque B3',
          row: 0,
          col: 2,
          currentPower: 600,
          currentTemperature: 22
        }
      ]
    },
    {
      id: 3,
      name: '2ème étage',
      gridRows: 4,
      gridCols: 5,
      rooms: [
        {
          id: 301,
          name: 'Salle de réunion R1',
          row: 0,
          col: 0,
          currentPower: 450,
          currentTemperature: 23
        },
        {
          id: 302,
          name: 'Bureau des professeurs P2',
          row: 0,
          col: 1,
          currentPower: 350,
          currentTemperature: 22
        },
        {
          id: 303,
          name: 'Salle multimédia M3',
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

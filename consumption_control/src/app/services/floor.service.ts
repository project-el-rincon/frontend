import { Injectable } from '@angular/core';
import { Floor } from '../models/floor.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  url: string = "http://localhost:3000/home";

  // Mise à jour du service FloorService
private mockFloors: Floor[] = [
  {
    id: 1,
    name: 'Rez-de-chaussée',
    level: 0,
    rooms: [
      { id: 101, name: 'Salle 001', floorId: 1, currentPower: 320, currentTemperature: 21.5 },
      { id: 102, name: 'Salle 002', floorId: 1, currentPower: 450, currentTemperature: 22.0 },
      { id: 103, name: 'Salle 003', floorId: 1, currentPower: 620, currentTemperature: 23.5 },
      { id: 104, name: 'Bureau 001', floorId: 1, currentPower: 210, currentTemperature: 20.8 },
      { id: 105, name: 'Cantine', floorId: 1, currentPower: 1200, currentTemperature: 24.2 },
    ]
  },
  {
    id: 2,
    name: 'Premier étage',
    level: 1,
    rooms: [
      { id: 201, name: 'Salle 101', floorId: 2, currentPower: 380, currentTemperature: 22.1 },
      { id: 202, name: 'Salle 102', floorId: 2, currentPower: 920, currentTemperature: 25.0 },
      { id: 203, name: 'Salle 103', floorId: 2, currentPower: 540, currentTemperature: 21.8 },
      { id: 204, name: 'Laboratoire', floorId: 2, currentPower: 1500, currentTemperature: 20.0 },
      { id: 205, name: 'Bibliothèque', floorId: 2, currentPower: 780, currentTemperature: 21.5 },
    ]
  },
  {
    id: 3,
    name: 'Deuxième étage',
    level: 2,
    rooms: [
      { id: 301, name: 'Salle 201', floorId: 3, currentPower: 410, currentTemperature: 21.2 },
      { id: 302, name: 'Salle 202', floorId: 3, currentPower: 350, currentTemperature: 20.9 },
      { id: 303, name: 'Salle 203', floorId: 3, currentPower: 890, currentTemperature: 23.7 },
      { id: 304, name: 'Salle informatique', floorId: 3, currentPower: 1750, currentTemperature: 24.1 },
    ]
  }
];

  constructor(private http: HttpClient) {}

  getFloors(): Observable<Floor[]> {
    // Pour le développement, utiliser les données mockées
    // En production, décommenter la ligne suivante :
    // return this.http.get<Floor[]>(`${this.apiUrl}/floors`);
    return of(this.mockFloors);
  }

  getFloorById(id: number): Observable<Floor | undefined> {
    // Pour le développement
    // En production, décommenter la ligne suivante :
    // return this.http.get<Floor>(`${this.apiUrl}/floors/${id}`);
    return of(this.mockFloors.find(floor => floor.id === id));
  }
}




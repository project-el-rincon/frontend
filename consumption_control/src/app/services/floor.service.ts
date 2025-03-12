import { Injectable } from '@angular/core';
import { Floor } from '../models/floor.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  url: string = "http://localhost:3000/home";

  // Données mockées pour le développement
  private mockFloors: Floor[] = [
    {
      id: 1,
      name: 'Rez-de-chaussée',
      level: 0,
      rooms: []
    },
    {
      id: 2,
      name: 'Premier étage',
      level: 1,
      rooms: []
    },
    {
      id: 3,
      name: 'Deuxième étage',
      level: 2,
      rooms: []
    }
  ];

  constructor(private http: HttpClient) {}

  getFloors(): Observable<Floor[]> {
    // Pour le développement, utiliser les données mockées
    // En production, décommenter la ligne suivante :
    // return this.http.get<Floor[]>(`${this.apiUrl}/floors`);
    return of(this.mockFloors);
  }

  getFloorById(id: number): Observable<Floor> {
    // Pour le développement
    // En production, décommenter la ligne suivante :
    // return this.http.get<Floor>(`${this.apiUrl}/floors/${id}`);
    return of(this.mockFloors.find(floor => floor.id === id));
  }
}




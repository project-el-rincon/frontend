import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

interface SensorData {
  id: number;
  room: string;
  energy: number;
  temperature: number;
  sound: number;
  motion: boolean;
  co2: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root', // ✅ Assurez-vous que le service est bien en 'root'
})
export class SensorDataService {
  constructor(private http: HttpClient) {}

  private mockData: SensorData[] = [
    { id: 1, room: 'Room 1', energy: 4.2, temperature: 22.5, sound: 35, motion: true, co2: 450, timestamp: '2025-03-11T10:00:00' },
    { id: 2, room: 'Room 2', energy: 3.1, temperature: 21.0, sound: 40, motion: false, co2: 400, timestamp: '2025-03-11T10:05:00' },
    { id: 3, room: 'Room 3', energy: 7.5, temperature: 23.0, sound: 50, motion: true, co2: 550, timestamp: '2025-03-11T10:10:00' },
    { id: 4, room: 'Room 4', energy: 5.0, temperature: 22.0, sound: 45, motion: false, co2: 500, timestamp: '2025-03-11T10:15'},
    { id: 5, room: 'Room 5', energy: 6.0, temperature: 22.5, sound: 35, motion: true, co2: 450, timestamp: '2025-03-11T10:20:00' },
  ];

  getMockSensorData(): Observable<SensorData[]> {
    return of(this.mockData).pipe(delay(1000));
  }

  getSensorDataFromAPI(apiUrl: string): Observable<SensorData[]> {
    return this.http.get<SensorData[]>(apiUrl);
  }

  getRoomData(roomId: number): Observable<SensorData> {
    return this.getMockSensorData().pipe(
      map(data => {
        const room = data.find(room => room.id === roomId);
        if (room) {
          return room;
        } else {
          console.warn(`Room with ID ${roomId} not found. Returning first room.`);
          return data[0]; // Retourne la première pièce si l'ID n'est pas trouvé
        }
      })
    );
  }
}

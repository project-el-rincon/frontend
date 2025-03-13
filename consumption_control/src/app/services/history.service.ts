import { Injectable } from '@angular/core';
import { HistoryData } from '../models/history.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private historyData: HistoryData[] = [
    {
      roomId: 1,
      timestamp: '00:00',
      energy: 15,
      temperature: 20,
      sound: 35,
      motion: true,
      co2: 400
    },
    {
      roomId: 1,
      timestamp: '04:00',
      energy: 30,
      temperature: 22,
      sound: 40,
      motion: false,
      co2: 420
    },
    {
      roomId: 1,
      timestamp: '08:00',
      energy: 25,
      temperature: 21,
      sound: 38,
      motion: true,
      co2: 410
    },
    {
      roomId: 1,
      timestamp: '12:00',
      energy: 35,
      temperature: 24,
      sound: 45,
      motion: false,
      co2: 430
    },
    {
      roomId: 1,
      timestamp: '16:00',
      energy: 45,
      temperature: 26,
      sound: 50,
      motion: true,
      co2: 450
    },
    {
      roomId: 1,
      timestamp: '20:00',
      energy: 40,
      temperature: 23,
      sound: 42,
      motion: false,
      co2: 440
    },
    {
      roomId: 1,
      timestamp: '24:00',
      energy: 50,
      temperature: 27,
      sound: 48,
      motion: true,
      co2: 460
    }
  ];

  constructor() {}

  // ✅ Récupérer l'historique des données pour une room spécifique
  getHistoryByRoomId(roomId: number): HistoryData[] {
    return this.historyData.filter(data => data.roomId === roomId);
  }
}

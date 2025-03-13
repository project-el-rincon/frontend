import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Challenge } from '../models/challenge.model';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {
  private challenges: Challenge[] = [
    { id: 1, roomId: 101, name: 'Reduce Energy Consumption', targetValue: 50, currentValue: 10, status: 'in-progress' },
    { id: 2, roomId: 102, name: 'Maintain Temperature', targetValue: 20, currentValue: 24, status: 'failed' },
    { id: 3, roomId: 101, name: 'Reduce Sound Levels', targetValue: 30, currentValue: 30, status: 'completed' }
  ];

  getChallenges(): Observable<Challenge[]> {
    return of(this.challenges);
  }
}

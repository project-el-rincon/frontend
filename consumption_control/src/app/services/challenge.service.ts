import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Challenge } from '../models/challenge.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ChallengeService {

  constructor(private apiService: ApiService) {}

  private challenges: Challenge[] = [
    { id: 1, roomId: 101, name: 'Reduce Energy Consumption', targetValue: 50, currentValue: 10, status: 'in-progress' },
    { id: 2, roomId: 102, name: 'Maintain Temperature', targetValue: 20, currentValue: 24, status: 'failed' },
    { id: 3, roomId: 101, name: 'Reduce Sound Levels', targetValue: 30, currentValue: 30, status: 'completed' }
  ];


  getChallenges(): Observable<Challenge[]> {
    return of(this.challenges);
  }

  /* getChallenges(): Observable<Challenge[]> {
    return this.apiService.get<Challenge[]>('challenges');
  } */

    // Récupérer les challenges en cours
    getActiveChallenges(): Observable<Challenge[]> {
      return this.apiService.get<Challenge[]>('challenges?status=in-progress');
    }

    // Récupérer les challenges terminés (réussis ou échoués)
  getCompletedChallenges(): Observable<Challenge[]> {
    return this.apiService.get<Challenge[]>('challenges?status=completed,failed');
  }

  // Récupérer les challenges par salle
  getChallengesByRoomId(roomId: number): Observable<Challenge[]> {
    return this.apiService.get<Challenge[]>(`challenges/room/${roomId}`);
  }

  // Marquer un challenge comme complété
/*   completeChallenge(challengeId: number, success: boolean): Observable<Challenge> {
    const status = success ? 'completed' : 'failed';
    return this.apiService.patch<Challenge>(`challenges/${challengeId}`, {
      status: status,
      completedAt: new Date().toISOString()
    });
  } */

  // Version temporaire avec données mockées
completeChallenge(challengeId: number, success: boolean): Observable<Challenge> {
  const status = success ? 'completed' : 'failed';
  
  // Mise à jour locale des données mockées
  const challenge = this.challenges.find(c => c.id === challengeId);
  if (challenge) {
    challenge.status = status as 'completed' | 'failed' | 'in-progress';
  }
  
  return of(challenge as Challenge);
}
}

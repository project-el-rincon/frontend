import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../../services/challenge.service';
import { Challenge } from '../../models/challenge.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css'],
  imports: [CommonModule]
})
export class ChallengeComponent implements OnInit {
  challenges: Challenge[] = [];
  filteredChallenges: Challenge[] = [];
  activeFilter: string = 'all';

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.getChallenges();
  }

  getChallenges() {
    this.challengeService.getChallenges().subscribe((data) => {
      this.challenges = data;
      this.filteredChallenges = [...this.challenges]; // Initialiser avec tous les challenges
    });
  }

  // Méthodes pour les filtres
  filterChallenges(filter: string) {
    this.activeFilter = filter;
    
    if (filter === 'all') {
      this.filteredChallenges = [...this.challenges];
    } else {
      this.filteredChallenges = this.challenges.filter(challenge => 
        challenge.status === filter);
    }
  }

  // Méthodes pour les statistiques
  getCompletedCount(): number {
    return this.challenges.filter(challenge => 
      challenge.status === 'completed').length;
  }

  getInProgressCount(): number {
    return this.challenges.filter(challenge => 
      challenge.status === 'in-progress').length;
  }

  getFailedCount(): number {
    return this.challenges.filter(challenge => 
      challenge.status === 'failed').length;
  }

  // Méthode pour compléter un challenge
  completeChallenge(challengeId: number, success: boolean) {
    // Version temporaire qui modifie uniquement les données locales
    // À remplacer par l'appel API quand il sera disponible
    const index = this.challenges.findIndex(c => c.id === challengeId);
    if (index !== -1) {
      this.challenges[index].status = success ? 'completed' : 'failed';
      // Réappliquer le filtre actif
      this.filterChallenges(this.activeFilter);
    }
    
    /* Version avec API - À décommenter quand l'API sera prête
    this.challengeService.completeChallenge(challengeId, success).subscribe({
      next: (updatedChallenge) => {
        const index = this.challenges.findIndex(c => c.id === challengeId);
        if (index !== -1) {
          this.challenges[index] = updatedChallenge;
          this.filterChallenges(this.activeFilter);
        }
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du challenge:', error);
      }
    });
    */
  }
}
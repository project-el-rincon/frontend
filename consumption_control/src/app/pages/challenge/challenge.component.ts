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

  constructor(private challengeService: ChallengeService) {}

  ngOnInit(): void {
    this.getChallenges();
  }

  getChallenges() {
    this.challengeService.getChallenges().subscribe((data) => {
      this.challenges = data;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartType, Chart, registerables, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { SensorDataService } from '../../services/sensor-data.service';

Chart.register(...registerables);

interface RoomRanking {
  name: string;
  score: number;
  energyConsumption: number;
  co2Level: number;
  trend: 'up' | 'down' | 'stable';
}

@Component({
  standalone: true,
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  imports: [CommonModule, BaseChartDirective, RouterModule]
})
export class StatisticsComponent implements OnInit {
  public pieChartLabels: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  public pieChartData: ChartData<'pie'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [30, 50, 40, 60, 70, 45], // Example data
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
      }
    ]
  };

  public pieChartType: ChartType = 'pie';

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#1B5E20' // Dark green
        }
      }
    }
  };

  public lineChartData: ChartData<'line'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Energy Consumption (kW)',
        data: [30, 50, 40, 60, 70, 45], // Example values for each month
        borderColor: '#1B5E20',
        backgroundColor: 'rgba(76,175,80,0.2)',
        tension: 0.4,
      }
    ]
  };

  roomRankings: RoomRanking[] = [];

  constructor(private sensorDataService: SensorDataService) {}

  ngOnInit(): void {
    this.loadRoomRankings();
  }

  private loadRoomRankings(): void {
    this.sensorDataService.getMockSensorData().subscribe(data => {
      this.roomRankings = data.map(room => {
        // Calculer un score écologique basé sur plusieurs facteurs
        const energyScore = this.normalizeScore(room.energy, 10, 0);
        const co2Score = this.normalizeScore(room.co2, 1000, 300);

        // Score total (plus le score est bas, plus c'est écologique)
        const totalScore = (energyScore + co2Score) / 2;

        return {
          name: room.room,
          score: totalScore,
          energyConsumption: room.energy,
          co2Level: room.co2,
          // Simuler une tendance (à remplacer par de vraies données historiques)
          trend: Math.random() > 0.5 ? 'up' : 'down'
        };
      });

      // Trier par score (du plus écologique au moins écologique)
      this.roomRankings.sort((a, b) => a.score - b.score);
    });
  }

  private normalizeScore(value: number, max: number, min: number): number {
    return ((value - min) / (max - min)) * 100;
  }

  getScoreColor(score: number): string {
    if (score <= 33) return '#4CAF50'; // Vert pour les bons scores
    if (score <= 66) return '#FFC107'; // Jaune pour les scores moyens
    return '#F44336'; // Rouge pour les mauvais scores
  }

  getTrendIcon(trend: 'up' | 'down' | 'stable'): string {
    switch (trend) {
      case 'up': return 'trending_up';
      case 'down': return 'trending_down';
      default: return 'trending_flat';
    }
  }

  getTrendColor(trend: 'up' | 'down' | 'stable'): string {
    switch (trend) {
      case 'up': return '#F44336'; // Rouge pour une tendance à la hausse (mauvais)
      case 'down': return '#4CAF50'; // Vert pour une tendance à la baisse (bon)
      default: return '#FFC107'; // Jaune pour stable
    }
  }
}

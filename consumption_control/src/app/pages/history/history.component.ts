import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType, Chart, registerables } from 'chart.js';
import { HistoryService } from '../../services/history.service';
import { BaseChartDirective } from 'ng2-charts';
import { RouterModule } from '@angular/router';


Chart.register(...registerables);

@Component({
  standalone: true,
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  imports: [BaseChartDirective, RouterModule]
})
export class HistoryComponent implements OnInit {

  public historyChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Past Energy Consumption (kW)',
        data: [],
        backgroundColor: 'rgba(255,99,132,0.2)', // 🔴 Rouge clair
        borderColor: 'rgba(255,99,132,1)', // 🔴 Rouge foncé
        borderWidth: 1
      },
      {
        label: 'Current Energy Consumption (kW)',
        data: [],
        backgroundColor: 'rgba(75,192,192,0.2)', // 🌿 Vert clair
        borderColor: 'rgba(75,192,192,1)', // 🌱 Vert foncé
        borderWidth: 1
      }
    ]
  };

  public historyChartOptions: ChartConfiguration<'bar'>['options'] = {
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
          color: '#1B5E20' // 🌱 Vert foncé
        }
      }
    }
  };

  public historyChartType: ChartType = 'line';

  constructor(private historyService: HistoryService) {}

  ngOnInit(): void {
    this.loadHistoryData();
  }

  private loadHistoryData() {
    const historyData = this.historyService.getHistoryByRoomId(1); // ✅ Room ID statique pour le moment
    this.historyChartData.labels = historyData.map(data => data.timestamp);
    this.historyChartData.datasets[0].data = historyData.map(data => data.energy); // 🔴 Anciennes données
    this.historyChartData.datasets[1].data = [20, 35, 40, 32, 50, 45, 60]; // 🌿 Données actuelles statiques pour la comparaison
  }
}

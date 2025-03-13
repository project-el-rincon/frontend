import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType, Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  standalone: true,
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  imports: [BaseChartDirective]
})
export class StatisticsComponent implements OnInit {

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
    datasets: [
      {
        label: 'Energy Consumption (kW)',
        data: [20, 35, 40, 32, 50, 45, 60], // ➡️ Exemple de données
        borderColor: '#1B5E20', // 🌱 Dark green
        backgroundColor: 'rgba(76,175,80,0.2)', // 🌿 Light green
        pointBackgroundColor: '#2E7D32',
        pointBorderColor: '#2E7D32',
        fill: true,
        tension: 0.4
      }
    ]
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
          color: '#1B5E20' // 🌱 Dark green
        }
      }
    }
  };

  // ✅ Utiliser 'ChartType' directement comme type
  public lineChartType: ChartType = 'bar'; // ✅ Correct
  // ou 'line

  constructor() {}

  ngOnInit(): void {}
}

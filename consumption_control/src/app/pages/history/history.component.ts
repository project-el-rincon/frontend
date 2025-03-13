import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType, Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  standalone: true,
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  imports: [BaseChartDirective]
})
export class HistoryComponent implements OnInit {

  // 🔴 Previous Consumption Data
  public previousChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Previous Consumption (kW)',
        data: [30, 50, 40, 60, 70, 45],
        backgroundColor: 'rgba(76,175,80,0.2)', // 🌿 Light green
        borderColor: '#1B5E20',
        borderWidth: 1
      }
    ]
  };

  // 🟢 Current Consumption Data
  public currentChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Current Consumption (kW)',
        data: [35, 55, 50, 65, 75, 55],
        backgroundColor: 'rgba(129,199,132,0.5)', // 🍃 Green
        borderColor: '#388E3C',
        borderWidth: 1
      }
    ]
  };

  public chartOptions: ChartConfiguration<'bar'>['options'] = {
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
          color: '#1B5E20'
        }
      }
    }
  };

  public chartType: ChartType = 'bar';

  // ➡️ Static data for the table
  public sensorData = [
    {
      room: 'Room A',
      energy: 35,
      temperature: 22,
      sound: 45,
      motion: true,
      co2: 400,
      timestamp: '2025-03-12T08:00:00'
    },
    {
      room: 'Room B',
      energy: 50,
      temperature: 24,
      sound: 50,
      motion: false,
      co2: 420,
      timestamp: '2025-03-12T10:00:00'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}

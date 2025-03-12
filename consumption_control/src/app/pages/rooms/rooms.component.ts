import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SensorDataService } from '../../services/sensor-data.service';
import { RouterModule } from '@angular/router';
import { GaugeChartComponent } from '../../components/gauge-chart/gauge-chart.component';


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

@Component({
  selector: 'app-rooms',
  standalone: true,
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
  imports: [CommonModule, RouterModule, GaugeChartComponent]
})
export class RoomsComponent implements OnInit {
  sensorData: SensorData[] = [];
  isLoading = true;

  constructor(private sensorDataService: SensorDataService) {}

  ngOnInit(): void {
    this.sensorDataService.getMockSensorData().subscribe(data => {
      this.sensorData = data;
      this.isLoading = false;
    });
  }
}

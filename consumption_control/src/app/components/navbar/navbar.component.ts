import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navLinks = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/rooms', label: 'Rooms', icon: 'meeting_room' },
    { path: '/statistics', label: 'Statistics', icon: 'bar_chart' },
    { path: '/history', label: 'History', icon: 'history' },
    { path: '/challenge', label: 'Challenges', icon: 'emoji_events' }
  ];
}

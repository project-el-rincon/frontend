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
    { path: '/', label: 'Home' },
    { path: '/history', label: 'Historique' },
    { path: '/statistics', label: 'Statistiques' },
    { path: '/rooms', label: 'Pièces' },
    { path: '/challenges', label: 'Défis' }
  ];
}

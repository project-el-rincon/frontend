import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/history', label: 'Historique' },
    { path: '/statistics', label: 'Statistiques' },
    { path: '/rooms', label: 'Pièces' },
    { path: '/challenges', label: 'Défis' }
  ];
}

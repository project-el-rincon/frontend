import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../app/pages/home/home.component';
import { HistoryComponent } from '../app/pages/history/history.component';
import { StatisticsComponent } from '../app/pages/statistics/statistics.component';
import { RoomsComponent } from '../app/pages/rooms/rooms.component';
import { ChallengeComponent } from '../app/pages/challenge/challenge.component';


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'rooms', component: RoomsComponent },
    { path: 'challenge', component: ChallengeComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
    { path: 'rooms/:id', component: RoomsComponent }
];


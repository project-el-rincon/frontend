import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { getRandomValues } from 'crypto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public data: any;
  
  public dataIndex = 2;
  public dataChoose: any;

  title = 'test';
  isLoggedIn = true;
  number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetch();
    this.dataChoose = this.data[this.dataIndex]
  }

  addItem() {
    this.number += 1;
  }

  toggle() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  chooseRandom() {
    this.dataIndex = Math.floor(Math.random() * 100);
    this.dataChoose = this.data[this.dataIndex]
  }

  public fetch() {
    this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe(
      (resp: any) => {
        this.data = resp;
      }
    );
  }
}
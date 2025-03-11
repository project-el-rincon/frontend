import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  public data: any;
  title = 'test';
  isLoggedIn = true;
  number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetch();
  }

  addItem() {
    this.number += 1;
  }

  toggle() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  public fetch() {
    this.http.get('https://jsonplaceholder.typicode.com/todos').subscribe(
      (resp: any) => {
        this.data = JSON.stringify(resp);
      }
    );
  }
}
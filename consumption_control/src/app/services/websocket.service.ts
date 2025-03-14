import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, EMPTY, Subject } from 'rxjs';
import { catchError, tap, switchAll } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any> | null = null;
  private messagesSubject = new Subject<Observable<any>>();
  public messages = this.messagesSubject.pipe(switchAll());

  constructor() {}

  connect(): Observable<any> {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket();
      const messages = this.socket$.pipe(
        tap({
          error: (error) => console.error('Erreur WebSocket:', error),
        }),
        catchError(() => {
          // Essayer de se reconnecter
          setTimeout(() => this.connect(), 5000);
          return EMPTY;
        })
      );
      this.messagesSubject.next(messages);
    }
    return this.messages;
  }

  sendMessage(msg: any): void {
    if (this.socket$ && !this.socket$.closed) {
      this.socket$.next(msg);
    }
  }

  close(): void {
    if (this.socket$) {
      this.socket$.complete();
      this.socket$ = null;
    }
  }

  private getNewWebSocket(): WebSocketSubject<any> {
    return webSocket({
      url: environment.websocketUrl || 'ws://localhost:8080',
      openObserver: {
        next: () => console.log('WebSocket connecté'),
      },
      closeObserver: {
        next: () => console.log('WebSocket déconnecté'),
      },
    });
  }
}

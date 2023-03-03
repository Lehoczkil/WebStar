import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // Stores the current error message for the user

  message = '';

  write(message: string) {
    this.message = message;
  }

  clear() {
    this.message = '';
  }

  constructor() { }
}

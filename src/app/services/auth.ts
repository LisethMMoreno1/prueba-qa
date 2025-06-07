import { Injectable } from '@angular/core';

interface User {
  name: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users: User[] = [
    { name: 'Jonie doe' ,username: 'jdoe', email: 'jdoe@example.com', password: 'abc123' },
    { name: 'Angel Smith' ,username: 'asmith', email: 'asmith@example.com', password: 'password1' }
  ];

  private currentUser: User | null = null;

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    this.currentUser = user || null;
    return !!user;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
  }
}

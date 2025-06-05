import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'] 
})
export class ProfileComponent implements OnInit {
  user: any = null;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

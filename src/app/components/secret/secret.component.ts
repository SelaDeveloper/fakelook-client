import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.scss'],
})
export class SecretComponent implements OnInit {
  sub!: Subscription;
  massages: any;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.sub = this.authService.secret().subscribe((res) => {
      this.massages = res;
    });
  }
}

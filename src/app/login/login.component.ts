import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
  loading$ = this.loader.loading$;

  constructor(
    public authService: AuthService,
    public loader: LoadingService
  ) {
  }

  ngOnInit(): void {
  }

}

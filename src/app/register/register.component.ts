import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { LoadingService } from '../shared/services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.scss' ]
})
export class RegisterComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public loader: LoadingService
  ) {
  }

  ngOnInit(): void {
  }

}

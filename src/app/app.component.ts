import { Component,  } from '@angular/core';
import { OnInit } from '@angular/core';
import { HomeService } from './shared/services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.homeService.getJwtToken().subscribe(
      response => {
        localStorage.setItem('token', response['token']);
      },
      error => {
        console.error('Error in creating JWT Token', error);
      }
    );
  }

  Logout() {
    localStorage.clear();
  }
}

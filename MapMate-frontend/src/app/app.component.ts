import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppState } from '../shared/store';
import { Store } from '@ngrx/store';
import { UserModel } from '../shared/models/login.model';
import { HomeComponent } from "./home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'MapMate';
  userInfo$: UserModel = {} as UserModel;

  constructor(private router: Router, private store: Store<AppState>) {
    this.store.select(state => state.userInfo).subscribe((userInfo) => {
      this.userInfo$ = userInfo;
      if (!userInfo.isLoggedIn) {
        this.router.navigateByUrl('/login');
      }
    })
  }
}

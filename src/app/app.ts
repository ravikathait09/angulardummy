import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Sidebar } from './shared/components/sidebar/sidebar';
import { Footer } from './shared/components/footer/footer';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    Header,
    Sidebar,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  isAuthPage = true;

  constructor(private router: Router) {

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {

        this.isAuthPage =
          this.router.url.startsWith('/login');

      });

  }
}
/*
 * Angular 2 decorators and services
 */
import {Component, Injector} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {CanActivate} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';

import {RouterActive} from './directives/router-active';
import {HomeComponent} from './home/components/home.component';
import {InspirationTaggingComponent} from './inspiration-tagging/inspiration-tagging.component';
import {CompanySelectComponent} from './inspiration-tagging/company-select.component';
import {SessionComponent} from "./session/session.component";
import {AuthService} from "./shared/services/auth.service";


/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'steelyard-admin-app',
    providers: [ ...FORM_PROVIDERS ],
    directives: [ ...ROUTER_DIRECTIVES, RouterActive ],
    pipes: [],
    styles: [`
        nav ul {
          display: inline;
          list-style-type: none;
          margin: 0;
          padding: 0;
          width: 60px;
        }
        nav li {
          display: inline;
        }
        nav li.active {
          background-color: lightgray;
        }
    `],
      template: `
      <div class="page-header">
        <div class="container">
          <h1>Steelyard <small>admin system</small></h1>

          <div class="navLinks">
            <a [routerLink]="['Home']">Home</a>
            <a (click)="logout()">Logout</a>

          </div>

        </div>
      </div>

      <div id="content">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </div>
      `
})

@RouteConfig([
    { path: '/home/...',
        name: 'Home',
        component: HomeComponent,
    },
    { path: '/',
        name: 'Login',
        component: SessionComponent,
        useAsDefault: true
    },
])
export class SteelyardAdminApp {

    constructor(public authService: AuthService) {}

    logout(): void {
        //this.sessionComponent.logout();
        this.authService.logout();
    }
}
/**
 * Created by eric on 2/23/16.
 */
/*
 * Angular
 */
import {Component} from 'angular2/core';
import {Router,RouterLink} from 'angular2/router';

/*
 * Services
 */
import {AuthService} from '../shared/services/auth.service';

/*
 * Session Interface
 */
export interface Session {
    xref_auth_token: string;
    type: string;
    login: string;
    short_type: string;
    email:string;
}

@Component({
    selector: 'login',
    template: `
  <div class="alert alert-danger" role="alert" *ngIf="message">
    {{ message }}
  </div>

  <form class="form-inline" *ngIf="!authService.getUser()">
    <div class="form-group">
      <label for="username">User:</label>
      <input class="form-control" name="username" #username>
    </div>

    <div class="form-group">
      <label for="password">Password:</label>
      <input class="form-control" type="password" name="password" #password>
    </div>

    <a class="btn btn-default" (click)="login(username.value, password.value)">
      Submit
    </a>
  </form>

  <div class="well" *ngIf="authService.getUser()">
    Logged in as <b>{{ authService.getUser() }}</b>
    <a href (click)="logout()">Log out</a>
  </div>
  `
})
export class SessionComponent {
    //results: Object;
    public session: Session;
    message: string;

    constructor(public authService: AuthService, public router: Router) {
        this.message = '';
    }

    login(username: string, password: string): void {
        this.authService.login(username, password)
                    .subscribe(
                        (res: any) => {
                            return this.handleResults(res);
                        },
                        error => { return this.handleError(error) });

    }

    logout(): void {
        this.authService.logout();
    }

    handleResults(res: any): void {
        this.session = <Session>res.response;
        console.log(this.session);

        if(this.session && this.session.xref_auth_token) {
            if(this.session.type === "StaffContact") {
                this.authService.setUser(this.session);
                this.router.parent.navigate(['Home/']);
            }
            else {
                this.message = "Error: Login must be Staff."
            }
        }
        else {
            this.message = "Error: Login and Password auth problem."
        }
    }

    handleError(error: any): void {
        console.log('in handleError', error);
        this.message = 'Login Error: ' + error;
    }
}

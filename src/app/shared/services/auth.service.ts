/**
 * Created by eric on 2/23/16.
 */
import {Injectable, provide, Directive, Inject} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES, RouteConfig, ROUTER_PROVIDERS} from 'angular2/router';
import {Observable} from 'rxjs/Observable';
import {AdminUserService} from './admin-user.service';

@Injectable()
export class AuthService {
    results: Object;
    errorMessage: string;

    constructor(private _adminUserService: AdminUserService, public router: Router) {}


    login(user: string, password: string):  Observable<any[]> {
        if (user && password) {
            return this._adminUserService.getUser(user, password);
        }
    }

    logout(): any {
        this.clearLocalStorageVars();
        this.router.navigate(['/Login']);
    }

    clearLocalStorageVars(): void {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('loginType');
        localStorage.removeItem('id_hash');
        localStorage.removeItem('short_type');
        localStorage.removeItem('login');
    }

    getUser(): any {
        // return localStorage.getItem('username');
    }

    setUser(user: any ): void {
        localStorage.setItem('auth_token', user.xref_auth_token);
        localStorage.setItem('loginType', user.type);
        localStorage.setItem('id_hash', user.id_hash);
        localStorage.setItem('short_type', user.short_type);
        localStorage.setItem('login', user.login);
    }

    isLoggedIn(): boolean {
        if(localStorage.getItem('auth_token') && localStorage.getItem('id_hash')) {
            return true;
        }
        else {
            return false;
        }
    }

    handleError(error: any): boolean {
        console.log('in handleError', error);
        return false;
    }
}

export var AUTH_PROVIDERS: Array<any> = [
    provide(AuthService, {useClass: AuthService})
];


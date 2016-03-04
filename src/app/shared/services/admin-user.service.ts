/**
 * Created by eric on 2/16/16.
 */
import {Injectable, provide} from 'angular2/core';
import {Http, Headers, Response, RequestOptions} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from "../app.settings";

import 'rxjs/Rx';

/*
 * AdminUserService queries the TAPI session endpoint to authenticate user
 * http://api.steelyardaccess.com/tapi/v2/companies?list=t
 */

@Injectable()
export class AdminUserService {
    static BASE_URL: string = `${AppSettings.API_BASE_URL}/sessions`;

    constructor(public http: Http) {}

    getUser(login: string, password: string) : Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({ login, password });

        return this.http.post(AdminUserService.BASE_URL, body, options)
                    .map((res:any) => res.json())
                    //.do(response => console.log(response)) // eyeball results in console
                    .catch(this.handleError);
    }

    private handleError (error: Response) {
        // set up error logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}
export var ADMIN_USER_PROVIDERS: Array<any> = [
    provide(AdminUserService, {useClass: AdminUserService})
];
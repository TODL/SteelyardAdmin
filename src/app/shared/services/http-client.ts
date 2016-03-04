/**
 * Created by eric on 3/3/16.
 */
import {Http, Headers} from 'angular2/http';
import {Injectable, provide} from 'angular2/core';

@Injectable()
export class HttpClient {
    constructor(public http: Http) {}

    createAuthorizationHeaders(headers: Headers) {
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `XRef ${localStorage.getItem('auth_token')}`);
    }

    get(url) {
        let headers = new Headers();
        this.createAuthorizationHeaders(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    request(url) {
        let headers = new Headers();
        this.createAuthorizationHeaders(headers);
        return this.http.request(url,{
            headers: headers
        });
    }

    post(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeaders(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }
}
export var HTTP_CLIENT_PROVIDERS: Array<any> = [
    provide(HttpClient, {useClass: HttpClient})
];
/**
 * Created by eric on 2/16/16.
 */
import {Injectable, provide} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {AppSettings} from "../app.settings";
import {HttpClient} from './http-client';

import 'rxjs/Rx';

/*
 * CompanyServices queries the TAPI api companies endpoint
 * http://api.steelyardaccess.com/tapi/v2/companies?list=t
 */

@Injectable()
export class CompanyService {
    static BASE_URL: string = `${AppSettings.API_BASE_URL}/companies`;

    constructor(public httpClient: HttpClient){

    }

    query(URL: string, params?: Array<string>): Observable<any[]> {
        let queryURL: string = `${CompanyService.BASE_URL}${URL}`;

        if(params) {
            queryURL = `${queryURL}?${params.join('&')}`;
        }

        return this.httpClient.request(queryURL).map((res:any) => res.json());
    }

    getCompanyList(): Observable<any[]> {
        return this.query('?list=t');
    }
}

export var COMPANY_PROVIDERS: Array<any> = [
    provide(CompanyService, {useClass: CompanyService})
];

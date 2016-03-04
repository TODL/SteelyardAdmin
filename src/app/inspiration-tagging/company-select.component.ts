/**
 * Created by eric on 2/16/16.
 */
import {Component, OnInit, Injector} from 'angular2/core';
import {
    Router,
    RouterLink,
    RouteParams,
    CanActivate
} from 'angular2/router';

import {AuthService} from "../shared/services/auth.service";
/*
 * Services
 */
import {COMPANY_PROVIDERS} from '../shared/services/company.service';
import {CompanyService} from '../shared/services/company.service';

@Component({
    selector: 'company-select',
    providers: [COMPANY_PROVIDERS],
    directives: [RouterLink],
    template: `
        <h4>Select Company</h4>
        <div>
            <select (change)="companySelected($event)">
                <option>Select a company...</option>
                <option *ngFor="#company of results"
                        [value]="company.id">
                        {{company.name}}
                </option>
            </select>
        </div>
    `
})
export class CompanySelectComponent implements OnInit {
    query: string;
    results: Object;

    constructor(public companies: CompanyService, public router: Router,
                public routeParams: RouteParams) {

    }

    ngOnInit(): void {
        this.getCompanies();
    }

    getCompanies(): void {
        this.companies.getCompanyList().subscribe((res: any) => this.renderResults(res));
    }

    renderResults(res: any): void {
        this.results = null;

        if(res && res.response) {
            // console.log(res.response);
            this.results = res.response;
        }
    }

    companySelected($event): void {
        console.log($event.target.value);
        this.router.parent.navigate(['Home/InspirationTagging', {id: $event.target.value}]);
    }
}

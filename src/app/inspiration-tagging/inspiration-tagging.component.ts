/**
 * Created by eric on 2/16/16.
 */
import {Component} from 'angular2/core';
import {
    Router,
    RouterLink,
    RouteParams
} from 'angular2/router';

// import {CompanySelectComponent} from 'components/CompanySelectComponent';

@Component({
    selector: 'inspiration-tagging',
    directives: [RouterLink],
    template: `
        <h2>Inspiration Tagging</h2>

        <company-select></company-select>

        <div>List items for company_id: {{id}} below</div>
    `
})
export class InspirationTaggingComponent {
    id: string;

    constructor(public routeParams: RouteParams) {
        this.id = routeParams.get('id');
        console.log('id is: ' + this.id);
    }

}

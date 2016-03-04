/**
 * Created by eric on 2/24/16.
 */
import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'home-index',
    directives: [ ...ROUTER_DIRECTIVES ],
    template: `
        <h2>Home Index</h2>
        <div>
            <a [routerLink]="['InspirationTaggingStart']">Inspiration Tagging</a>
        </div>
    `
})
export class IndexComponent {
    constructor() {

    }
}

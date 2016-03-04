/**
 * Created by eric on 2/15/16.
 */
import {Component, Injector} from 'angular2/core';
import {
    Router,
    RouteConfig,
    RouterLink,
    RouteParams,
    CanActivate,
    ROUTER_DIRECTIVES
} from 'angular2/router';

/*
 * Services
 */
import {appInjector} from '../../app-injector';
import {AuthService} from "../../shared/services/auth.service";

/*
 * Components
 */
import {IndexComponent} from "./index.component";
import {InspirationTaggingComponent}
    from '../../inspiration-tagging/inspiration-tagging.component';
import {CompanySelectComponent}
    from '../../inspiration-tagging/company-select.component';
import {Inject} from "angular2/core";

@Component({
    selector: 'home',
    directives: [ ...ROUTER_DIRECTIVES ],
    template: `
      <router-outlet></router-outlet>
    `
})
/* Current component and all child routes will be secured with authService */
@CanActivate(
    (nextInstr: any, currInstr: any) => {
        let injector: Injector = appInjector();
        let authService: AuthService = injector.get(AuthService);
        let router: Router = injector.get(Router);

        if(authService.isLoggedIn()) {
            return true;
        }
        else {
            router.navigate(['/Login']);
            return false;
        }
    }
)
@RouteConfig([
    { path: '/index', name: 'Index', component: IndexComponent, useAsDefault: true },
    { path: '/inspiration-tagging/:id',
      name: 'InspirationTagging',
      component: InspirationTaggingComponent
    },
    { path: '/inspiration-tagging-start',
      name: 'InspirationTaggingStart',
      component: CompanySelectComponent
    },

])
export class HomeComponent {

}

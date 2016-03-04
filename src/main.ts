/*
 * Providers provided by Angular
 */
import {provide, enableProdMode, ComponentRef} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AUTH_PROVIDERS} from './app/shared/services/auth.service';
import {ADMIN_USER_PROVIDERS} from './app/shared/services/admin-user.service';
import {APP_SETTING_PROVIDERS} from './app/shared/app.settings';
import {HTTP_CLIENT_PROVIDERS} from './app/shared/services/http-client';
import {appInjector} from './app/app-injector';
import {AppSettings} from './app/shared/app.settings';


const ENV_PROVIDERS = [ AUTH_PROVIDERS,
                        ADMIN_USER_PROVIDERS,
                        APP_SETTING_PROVIDERS,
                        HTTP_CLIENT_PROVIDERS
                      ];


if ('production' === process.env.ENV) {
  enableProdMode();
} else {
  ENV_PROVIDERS.push(ELEMENT_PROBE_PROVIDERS);
}


/*
 * Webpack
 */
require('./assets/css/styles.scss');

/*
 * App Component
 * our top level component that holds all of our components
 */
import {SteelyardAdminApp} from './app/app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', function main() {
  bootstrap(SteelyardAdminApp, [
    ...ENV_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
  ]).then((appRef: ComponentRef) => {
      // store a reference to the application injector
      appInjector(appRef.injector);
  });

});

// For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
// Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module

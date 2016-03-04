import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

// Load the implementations that should be tested
import {SteelyardAdminApp} from './app';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    SteelyardAdminApp
  ]);

  // it('should have a url', inject([ SteelyardAdminApp ], (app) => {
  //  expect(app.url).toEqual('https://twitter.com/AngularClass');
  // }));

});

 /*
  * TODO: ES5 for now until I make a webpack plugin for protractor
  */
describe('App', () => {

  beforeEach(() => {
    // change hash depending on router LocationStrategy
    browser.get('/#/home');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Steelyard Admin';
    expect(subject).toEqual(result);
  });

  // it('should have `your content here` x-large', () => {
  //   let subject = element(by.css('[x-large]')).getText();
  //   let result  = 'Your Content Here';
  //   expect(subject).toEqual(result);
  // });


});

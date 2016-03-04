 /*
  * TODO: ES5 for now until I make a webpack plugin for protractor
  */
describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Steelyard Admin';
    expect(subject).toEqual(result);
  });

  it('should have header text', () => {
    let subject = element(by.css('div.container h1')).getText();
    let result  = 'Steelyard admin system';
    expect(subject).toEqual(result);
  });

  // it('should have <main>', () => {
  //   let subject = element(by.css('app main')).isPresent();
  //   let result  = true;
  //   expect(subject).toEqual(result);
  // });

});

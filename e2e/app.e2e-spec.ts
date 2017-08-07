import { CommonservicePage } from './app.po';

describe('commonservice App', () => {
  let page: CommonservicePage;

  beforeEach(() => {
    page = new CommonservicePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

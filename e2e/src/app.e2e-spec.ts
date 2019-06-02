import { browser, by, element } from 'protractor';
import { AppPage } from './app.po';
import { protractor } from 'protractor/built/ptor';

describe('Movie Cruiser App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display title', () => {
        page.navigateTo();
        expect(browser.getTitle()).toEqual('Movie Cruiser App');
    });

    it('should be redirected to /register route', () => {
        browser.element(by.css('.reg-btn')).click();
        expect(browser.getCurrentUrl()).toContain('/register');
    });

    it('should be able to register user', () => {
        browser.element(by.id('firstName')).sendKeys('Anil');
        browser.element(by.id('lastName')).sendKeys('Kumar');
        browser.element(by.id('userId')).sendKeys('anil');
        browser.element(by.id('password')).sendKeys('1234');
        browser.element(by.css('.reg-user-btn')).click();
        expect(browser.getCurrentUrl()).toContain('/login');
    });

    it('should be able to login user and navigate to popular movies', () => {
        browser.element(by.id('userId')).sendKeys('anil');
        browser.element(by.id('password')).sendKeys('1234');
        browser.element(by.css('.login-user-btn')).click();
        expect(browser.getCurrentUrl()).toContain('/movies/popular');
    });

    it('should be able to search movies', () => {
        browser.element(by.css('.search-tab')).click();
        expect(browser.getCurrentUrl()).toContain('/movies/search');
        browser.element(by.id('searchInput')).sendKeys('Athadu');
        browser.element(by.id('searchInput')).sendKeys(protractor.Key.ENTER);
        
        browser.driver.sleep(1000);
        const searchItems = element.all(by.css('.movie-title'));
        expect(searchItems.count()).toBeGreaterThan(0);
    });

    it('should be able to add movie to watch list', () => {
        browser.driver.manage().window().maximize();
        browser.driver.sleep(1000);
        
        const searchItems = element.all(by.css('.add-movie-btn'));
        expect(searchItems.count()).toBeGreaterThan(0);
        searchItems.get(0).click();
    });

    it('should be able to see watchlist movies', () => {
        browser.element(by.css('.watchlist-tab')).click();
        expect(browser.getCurrentUrl()).toContain('/movies/watchlist');
        
        browser.driver.sleep(1000);
        const searchItems = element.all(by.css('.movie-title'));
        expect(searchItems.count()).toBeGreaterThan(0);
    });

    it('should be able to logout user and navigate to login', () => {
        browser.element(by.css('.logout-tab')).click();
        expect(browser.getCurrentUrl()).toContain('/login');
    });
});
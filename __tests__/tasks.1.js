const puppeteer = require("puppeteer");
const path = require('path');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe('Header Logo & title', () => {
    it("Header should contain title `The Speaker Shop`", async () => {
        const title = await page.$eval('body', el => el.textContent);
        expect(title).toMatch(/The Speaker Shop/i);
    });
});

describe('Navigation', () => {
    it("Navigation should contain 3 links", async () => {
        const links = await page.evaluate(() => {
            const els = document.querySelectorAll('*');
            return Array.from(els).map(el => el.tagName);
        });
        expect(links.filter(e => e === 'A').length).toBeGreaterThan(2);
    });
});

describe('Flexbox', () => {
    it("Flexbox is used to lay out the products", async () => {
        const flex =  await page.$$eval('*', el => Array.from(el).filter(e => getComputedStyle(e).getPropertyValue('display') == 'flex' && e.childNodes.length));
        expect(flex.length).toBeGreaterThan(0);
    })
});
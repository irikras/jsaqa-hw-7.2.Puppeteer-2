const { clickElement, getText } = require("./lib/commands.js");
const puppeteer = require("puppeteer");

let page;
let day = ".page-nav > a:nth-child(3)";
let time = "a.movie-seances__time";
let button = "button.acceptin-button";

afterEach(() => {
  page.close();
});

describe("Ticket booking tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    page.setDefaultNavigationTimeout(0);
  });
  
  test("Should successfully book one ticket", async () => {
    await clickElement(page, day);
    await clickElement(page, time);
    await clickElement(page, ".buying-scheme__wrapper > div:nth-child(5) > span:nth-child(2)");
    await clickElement(page, button);
    await clickElement(page, button);
    const actual = await getText(page, "h2.ticket__check-title");
    expect(actual).toContain("Электронный билет");
    await page.screenshot({ path: "Screenshots/Booking1.png" });
  });
  test("Should successfully book two tickets", async () => {
    await clickElement(page, day);
    await clickElement(page, time);
    await clickElement(page, ".buying-scheme__wrapper > div:nth-child(4) > span:nth-child(6)");
    await clickElement(page, ".buying-scheme__wrapper > div:nth-child(4) > span:nth-child(7)");
    await clickElement(page, button);
    await clickElement(page, button);
    const actual = await getText(page, "h2.ticket__check-title");
    expect(actual).toContain("Электронный билет");
    await page.screenshot({ path: "Screenshots/Booking2.png" });    
  });
  test("Should unsuccessful to book already booked ticket", async () => {
    await clickElement(page, day);
    await clickElement(page, time);
    await clickElement(page, ".buying-scheme__wrapper > div:nth-child(5) > span:nth-child(2)");
    expect(
      String(
        await page.$eval("button", (button) => {
          return button.disabled;
        })
      )
    ).toContain("true");
    await page.screenshot({ path: "Screenshots/Booking3.png" });
  });
});

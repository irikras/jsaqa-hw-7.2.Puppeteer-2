const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { clickElement, getText } = require("../../lib/commands.js");
const { setDefaultTimeout } = require("@cucumber/cucumber");
setDefaultTimeout(60 * 1000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`${string}`, {
    setTimeout: 45000,
  });
});

When("user choose day", async function () {
  return await clickElement(this.page, ".page-nav > a:nth-child(5)");
});
When("user choose time", async function () {
  return await clickElement(this.page, "a.movie-seances__time");
});
When("user select 5 row 2 seat", async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__row > span:nth-child(2)"
  );
});
When("user select 5 row 6 seat", async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__row > span:nth-child(6)"
  );
});
When("user select 5 row 7 seat", async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__row > span:nth-child(7)"
  );
});
When("user choose the booked place", async function () {
  return await clickElement(
    this.page,
    ".buying-scheme__row > span:nth-child(7)"
  );
});
When("user click button", async function () {
  return await clickElement(this.page, "button.acceptin-button");
});
When("user click get reservation code", async function () {
  return await clickElement(this.page, "button.acceptin-button");
});

Then("user received an electronic ticket {string}", async function (string) {
  const actual = await getText(this.page, "h2.ticket__check-title");
  const expected = await string;
  expect(actual).contains(expected);
});

Then("user sees button disabled {string}", async function (string) {
  const actual = String(
    await this.page.$eval("button", (button) => {
      return button.disabled;
    })
  );
  const expected = await string;
  expect(actual).contains(expected);
});

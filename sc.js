const test = require("node:test");
const puppeteer = require("puppeteer-core");
const chromium = require("@sparticuz/chromium");

// Optional: If you'd like to disable webgl, true is the default.
chromium.setGraphicsMode = false;

test("Check the page title of example.com", async (t) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.goto("https://ums-minor.vercel.app");
  const pageTitle = await page.title();
  await browser.close();

  assert.strictEqual(pageTitle, "Example Domain");
});
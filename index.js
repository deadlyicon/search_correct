const puppeteer = require('puppeteer')

module.exports = async function(term){
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: true,
  });
  const page = await browser.newPage();
  const url = `https://duckduckgo.com/?q=${encodeURIComponent(term)}`
  await page.goto(url)
  await page.waitForNavigation()
  const node = await page.$('.js-spelling-suggestion-link')
  const result = await page.evaluate(node => node.innerText, node);
  await browser.close();
  return result
}
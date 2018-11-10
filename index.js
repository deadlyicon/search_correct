const puppeteer = require('puppeteer')

module.exports = async function(term){
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: true,
  });
  const page = await browser.newPage();
  const url = `https://duckduckgo.com/?q=${encodeURIComponent(term)}`
  try{
    await page.goto(url, {timeout: 2000})
  }catch(error){
    console.error(`failed to goto url ${url}`)
    throw error
  }
  try{
    await page.waitForSelector('.js-spelling-suggestion-link', {timeout: 1000})
  }catch(error){
    console.error('failed waiting for result selector')
    throw error
  }
  let node
  try{
    node = await page.$('.js-spelling-suggestion-link')
  }catch(error){
    console.error('failed looking for result on page')
    throw error
  }
  const result = await page.evaluate(node => node.innerText, node);
  await browser.close();
  return result
}
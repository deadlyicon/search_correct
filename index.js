const debug = require('debug')('search_correct')
const puppeteer = require('puppeteer')

module.exports = async function(term){
  debug(`launching chrome`)
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: true,
  });
  try{
    const page = await browser.newPage()
    const result = await queryForResult(page, term)
    return result
  }catch(error){
    throw error
  }finally{
    await browser.close()
  }
}

const queryForResult = async function(page, term){
  const url = `https://duckduckgo.com/?q=${encodeURIComponent(term)}`
  try{
    debug(`navigating to ${url}`)
    await page.goto(url, {timeout: 5000})
  }catch(error){
    debug(`failed to goto url ${url}`)
    throw error
  }
  try{
    debug(`waiting for spelling selector`)
    await page.waitForSelector('.js-spelling-suggestion-link', {timeout: 5000})
  }catch(error){
    debug('failed waiting for result selector', error)
    return term
  }
  let node
  try{
    debug(`getting spelling selector node`)
    node = await page.$('.js-spelling-suggestion-link', {timeout: 5000})
  }catch(error){
    debug('failed looking for result on page')
    return term
  }
  const result = await page.evaluate(node => node.innerText, node);
  debug(`found result: ${result}`)
  return result
}
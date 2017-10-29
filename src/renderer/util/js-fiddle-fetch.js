import request from 'request'
import cheerio from 'cheerio'

const JSFiddleReg = /^https?:\/\/jsfiddle\.net\/[0-9A-Za-z/]+$/

/**
 * Check given url is valide jsfiddle url
 * @param {String} url
 */
function isValidJSFiddleURL (url) {
  return JSFiddleReg.test(url)
}

/**
 * Parse jsfiddle page content
 * @param {String} body html content
 * @return {Object} object contain css、js、html
 */
function parseJSFiddleBody (body) {
  let content = {}
  let $ = cheerio.load(body)

  content.html = $('#id_code_html').text()
  content.css = $('#id_code_css').text()
  content.js = $('#id_code_js').text()

  return content
}

/**
 * Fetch code from jsfiddle page
 * @param {String} url valid jsfiddle
 * @return {Promise}
 */
function JSFiddleFetcher (url) {
  return new Promise((resolve, reject) => {
    if (isValidJSFiddleURL(url)) {
      request({
        url: url,
        headers: {
          'Host': 'jsfiddle.net',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'DNT': 1,
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
        }
      }, (err, res, body) => {
        if (err) {
          reject(err)
        } else {
          resolve(parseJSFiddleBody(body))
        }
      })
    } else {
      reject(new Error('无效的JSFiddle地址'))
    }
  })
}

export default JSFiddleFetcher

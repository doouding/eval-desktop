import request from 'request'
import cheerio from 'cheerio'
import he from 'he'

const FetchReg = /^https?:\/\/(jsfiddle\.net|codepen\.io)\/[0-9_A-Za-z/]+$/

/**
 * Check given url is valide jsfiddle url
 * @param {String} url
 */
function isValidURL (url) {
  return FetchReg.test(url)
}

/**
 * Parse jsfiddle page content
 * @param {String} body html content
 * @return {Object} object contain css、js、html
 */
function parseBody (type, body) {
  if (type.toLowerCase() === 'jsfiddle') return parseJSFiddleBody(body)
  else return parseCodepenBody(body)
}

/**
 * Parse codepen snippet
 * @param {*} body html body content
 * @return {Object} object contain css、js、html
 */
function parseCodepenBody (body) {
  let content = {}
  let $ = cheerio.load(body)

  content.html = he.decode($('#html > code').text()).trim()
  content.css = $('#css > code').text().trim()
  content.js = $('#js > code').text().trim()

  return content
}

/**
 * Parse jsfiddle snippet
 * @param {*} body html body content
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
 * Generate http header accroding type
 * @param {String} type snippet type
 * @return {Object} http header
 */
function genHTTPHeader (type) {
  return {
    'Host': type.toLowerCase() === 'jsfiddle' ? 'jsfiddle.net' : 'codepen.io',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
  }
}

/**
 * Fetch code from jsfiddle page
 * @param {String} url valid jsfiddle
 * @return {Promise}
 */
function SnippetFetcher (type, url) {
  return new Promise((resolve, reject) => {
    if (isValidURL(url)) {
      request({
        url: url,
        headers: genHTTPHeader(type)
      }, (err, res, body) => {
        if (err) {
          reject(err)
          return
        }

        resolve(parseBody(type, body))
      })
    } else {
      reject(new Error('无效的Snippet地址'))
    }
  })
}

export default SnippetFetcher

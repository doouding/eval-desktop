import pug from 'pug'

/**
 * Parse pug template
 * @param {String} content Valid pug string
 * @return {String} compiled string
 */
function parsePug (content) {
  return new Promise((resolve, reject) => {
    let result

    try {
      result = pug.compile(content)()
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

export default {
  'Pug': {
    'mode': 'text/x-pug',
    'process': parsePug
  },

  'HTML': {
    'mode': 'text/html',
    'process': null
  }
}

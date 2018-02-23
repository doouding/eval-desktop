import Sass from 'sass.js/dist/sass.js'

export default {
  'CSS': null,
  'Sass': parseSass,
  'Scss': parseScss
}

const sassCompiler = new Sass('/static/sass.worker.js')
function parseSass (code) {
  return new Promise((resolve, reject) => {
    sassCompiler.compile(code, { indentedSyntax: true }, (result) => {
      if (result.status === 1) {
        reject(result.formatted)
      }
      resolve(result.text)
    })
  })
}

function parseScss (code) {
  return new Promise((resolve, reject) => {
    sassCompiler.compile(code, { indentedSyntax: false }, (result) => {
      if (result.status === 1) {
        reject(result.formatted)
      }
      resolve(result.text)
    })
  })
}

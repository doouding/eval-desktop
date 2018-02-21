import sass from 'sass.js'

export default {
  'Scss': parseScss,
  'Sass': parseSass,
  'CSS': null
}

const sassCompiler = sass
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

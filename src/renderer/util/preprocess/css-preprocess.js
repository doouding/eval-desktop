import Sass from 'sass.js/dist/sass.js'

export default {
  'css': parseScss,
  'sass': parseSass,
  'scss': parseScss
}
Sass.setWorkerUrl('/static/sass.worker.js')
const sassCompiler = new Sass()
function parseSass (code) {
  return new Promise((resolve, reject) => {
    console.log('sass')
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

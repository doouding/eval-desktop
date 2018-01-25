import less from 'less/dist/less.min'
import sass from 'sass.js'

export default {
  'Less': parseLess,
  'Scss': parseScss,
  'Sass': parseSass,
  'CSS': null
}

function parseLess (code) {
  return new Promise((resolve, reject) => {
    less.render(code, (err, result) => {
      if (err) {
        reject(err)
      }

      resolve(result.css)
    })
  })
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

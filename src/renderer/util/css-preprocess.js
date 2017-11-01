import less from 'less'
import sass from 'node-sass'
import stylus from 'stylus'

function parseLess (content) {
  return new Promise((resolve, reject) => {
    less.render(content, (err, output) => {
      if (err) {
        reject(err)
      }

      resolve(output.css)
    })
  })
}

function parseSassScss (content, intented) {
  return new Promise((resolve, reject) => {
    try {
      let result = sass.renderSync({
        data: content,
        indentedSyntax: intented
      })

      resolve(result.css)
    } catch (e) {
      reject(e)
    }
  })
}

function parseStylus (content) {
  return new Promise((resolve, reject) => {
    stylus.render(content, (err, css) => {
      if (err) {
        reject(err)
      }

      resolve(css)
    })
  })
}

export default {
  'SCSS': {
    'mode': 'text/x-scss',
    'process': (content) => { return parseSassScss(content, false) }
  },
  'Sass': {
    'mode': 'text/x-sass',
    'process': (content) => { return parseSassScss(content, true) }
  },
  'Stylus': {
    'mode': 'text/x-styl',
    'process': parseStylus
  },
  'LESS': {
    'mode': 'text/x-less',
    'process': parseLess},
  'CSS': {
    'mode': 'text/css',
    'process': null
  }
}

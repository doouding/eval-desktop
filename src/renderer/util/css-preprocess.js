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

function parseSassScss (content) {
  return new Promise((resolve, reject) => {
    sass.render({
      data: content
    }, (err, result) => {
      console.log(err)
      console.log(result)
      if (err) {
        reject(err)
      }

      resolve(result.css)
    })
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
  'SCSS': parseSassScss,
  'Sass': parseSassScss,
  'Stylus': parseStylus,
  'LESS': parseLess
}

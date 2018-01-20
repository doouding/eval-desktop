import pug from 'pug'

export default {
  'pug': pugCompiler,
  'html': null
}

function pugCompiler (code) {
  return new Promise((resolve, reject) => {
    let result

    try {
      result = pug.render(code, { pretty: true })
      resolve(result)
    } catch (e) {
      reject(e.message)
    }
  })
}

const Babel = require('@babel/standalone')

export default {
  babel: babelCompiler
}

const babelrc = {
  presets: ['es2015', 'es2016', 'es2017']
}

function babelCompiler (code) {
  try {
    return Promise.resolve(Babel.transform(code, babelrc).code)
  } catch (e) {
    return Promise.reject(e)
  }
}

const Babel = require('@babel/standalone')

export default {
  javascript: babelCompiler,
  babel: babelCompiler,
  jsx: jsxCompiler
}

const babelrc = {
  presets: ['es2015', 'es2016', 'es2017']
}

const jsxrc = {
  presets: ['es2015', 'es2016', 'es2017'],
  plugins: ['transform-react-jsx']
}

function babelCompiler (code) {
  try {
    return Promise.resolve(Babel.transform(code, babelrc).code)
  } catch (e) {
    return Promise.reject(e)
  }
}

function jsxCompiler (code) {
  try {
    return Promise.resolve(Babel.transform(code, jsxrc).code)
  } catch (e) {
    return Promise.reject(e)
  }
}

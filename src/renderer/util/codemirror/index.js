import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/3024-day'
import 'codemirror/theme/base16-light'
import autoRefresh from './addon/autorefresh'
import emmet from '@emmetio/codemirror-plugin'
import CodeMirror from 'codemirror'
import javascript from './javascript'
import jsx from './jsx'
import css from './css'
import xml from './xml'
import html from './html'
import sass from './sass'
import pug from './pug'

/** Register plugin */
emmet(CodeMirror)
autoRefresh(CodeMirror)

/** Register highlight */
javascript(CodeMirror)
jsx(CodeMirror)
css(CodeMirror)
xml(CodeMirror)
html(CodeMirror)
sass(CodeMirror)
pug(CodeMirror)

const baseConfig = {
  lineWrapping: true,
  theme: 'base16-light',
  lineNumbers: true,
  autoRefresh: true
}

function CodeMirrorWrap (el, config) {
  return CodeMirror(el, Object.assign({}, baseConfig, config))
}

export default CodeMirrorWrap

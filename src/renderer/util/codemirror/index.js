import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/3024-day'
import 'codemirror/addon/display/autorefresh'
import CodeMirror from 'codemirror'
import emmet from '@emmetio/codemirror-plugin'
import javascript from './javascript'
import css from './css'
import xml from './xml'
import html from './html'
import sass from './sass'
import pug from './pug'

/** Register emmet plugin */
emmet(CodeMirror)

/** Register highlight */
javascript(CodeMirror)
css(CodeMirror)
xml(CodeMirror)
html(CodeMirror)
sass(CodeMirror)
pug(CodeMirror)

console.log(CodeMirror.mimeModes)

const baseConfig = {
  lineWrapping: true,
  theme: '3024-day',
  lineNumbers: true,
  autoRefresh: true
}

function CodeMirrorWrap (el, config) {
  return CodeMirror(el, Object.assign({}, baseConfig, config))
}

export default CodeMirrorWrap

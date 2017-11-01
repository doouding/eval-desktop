import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/3024-day'
import 'codemirror/addon/display/autorefresh'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/stylus/stylus'
import 'codemirror/mode/sass/sass'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/pug/pug'
import emmet from '@emmetio/codemirror-plugin'

/** Register emmet plugin */
emmet(CodeMirror)

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

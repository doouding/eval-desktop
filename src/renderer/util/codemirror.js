import CodeMirror from 'codemirror/lib/codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/3024-day'
import 'codemirror/addon/display/autorefresh'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/htmlmixed/htmlmixed'

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

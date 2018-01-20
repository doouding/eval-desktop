<template>
  <div>
  </div>
</template>

<script>
/** 
 * @fileoverview Editor component is responsible for writing code, compile code and syntax error prompt
 */
import CodeMirror from '@/util/codemirror'
import preprocessor from '@/util/preprocess'

const LANG_MODE_MAP = {
  // css
  'css': 'text/css',
  'less': 'text/x-less',
  'scss': 'text/x-scss',
  'sass': 'text/x-sass',

  // html
  'html': 'text/html',

  // javascript
  'javascript': 'text/javascript'
}

export default {
  name: 'CodeMirror',

  mounted () {
    console.log(LANG_MODE_MAP[this.lang.toLowerCase()])
    this.editor = CodeMirror(this.$el, {
      mode: LANG_MODE_MAP[this.lang.toLowerCase()]
    })
  },

  data () {
    return {
      editor: null
    }
  },

  props: {
    lang: {
      type: String,
      required: true,
      validator (val) {
        return LANG_MODE_MAP.hasOwnProperty(val)
      }
    }
  },

  watch: {
    lang (newVal) {
      this.editor.setOption('mode', newVal)
      this.editor.doc.setValue('')
    }
  },

  methods: {
    compile () {
      return new Promise((resolve, reject) => {
        preprocessor[this.lang](this.value)
          .then(resolve)
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
</script>

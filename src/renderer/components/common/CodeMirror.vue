<template>
  <div>
  </div>
</template>

<script>
import CodeMirror from '@/util/codemirror'

const LANG_MODE_MAP = {
  // css
  'css': 'text/css',
  'less': 'text/x-less',
  'scss': 'text/x-scss',
  'sass': 'text/x-sass',
  'stylus': 'text/x-styl',

  // html
  'html': 'text/html',

  // javascript
  'javascript': 'text/javascript'
}

export default {
  name: 'CodeMirror',

  beforeMount () {
    this.editor = CodeMirror(this.$el, {
      value: this.value,
      mode: LANG_MODE_MAP[this.lang.toLowerCase()]
    })

    this.editor.on('change', (editor) => {
      this.updateValue(editor.getValue())
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
    },
    value: {
      type: String,
      required: true
    }
  },

  watch: {
    value (newVal) {
      this.editor.doc.setValue(newVal)
    },

    lang (newVal) {
      this.editor.setOption('mode', newVal)
      this.editor.doc.setValue('')
    }
  },

  methods: {
    updateValue (newVal) {
      this.$emit('input', newVal)
    },
    compile () {
      
    }
  }
}
</script>

<template>
  <div class="codemirror-component">
    <div class="editor-bar">
      <el-dropdown @command="changeLang" trigger="click">
        <span class="el-dropdown-link">
          {{current}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(value, key) in langs" :key="value" :command="key">{{key}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="editor-wrap"></div>
  </div>
</template>

<script>
/**
 * @fileoverview Editor component is responsible for writing code, compile code and syntax error prompt
 */
import CodeMirror from '@/util/codemirror'
import preprocessor from '@/util/preprocess'

const LANG_MODE_MAP = {
  'CSS': {
    'CSS': 'text/css',
    'Less': 'text/x-less',
    'Scss': 'text/x-scss',
    'Sass': 'text/x-sass'
  },

  'HTML': {
    'HTML': 'text/html'
  },

  'JavaScript': {
    'JavaScript': 'text/javascript'
  }
}

const EMMET_ENABLE = ['HTML']

export default {
  name: 'CodeMirror',

  mounted () {
    let options = {
      mode: LANG_MODE_MAP[this.lang][this.lang]
    }

    if (EMMET_ENABLE.includes(this.lang)) {
      options.extraKeys = {
        'Tab': 'emmetExpandAbbreviation',
        'Enter': 'emmetInsertLineBreak'
      }
    }

    this.editor = CodeMirror(this.$el.querySelector('.editor-wrap'), options)
    // set default language
    this.current = this.lang
    this.langs = LANG_MODE_MAP[this.lang]
  },

  data () {
    return {
      current: '',
      langs: null,
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

  methods: {
    compile () {
      return new Promise((resolve, reject) => {
        preprocessor[this.lang](this.value)
          .then(resolve)
          .catch((err) => {
            reject(err)
          })
      })
    },
    changeLang (lang) {
      if (this.current !== lang) {
        this.editor.setOption('mode', this.langs[lang])
        this.current = lang
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.codemirror-component
  height: 100%
  position: relative

.editor-bar
  padding: .5em 1.2em
  background-color: #f7f7f7
  .el-dropdown-link
    font-family: 'Ubuntu'
    cursor: pointer
    outline: none
    color: #777
    user-select: none
    font-size: 13px
    letter-spacing: .15em
</style>

<style lang="sass">
.editor-wrap
  position: absolute
  top: 34px
  bottom: 0
  width: 100%
  > .CodeMirror
    height: 100%
</style>

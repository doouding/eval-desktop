<template>
  <div class="codemirror-component">
    <div class="editor-bar" v-if="preprocessor !== null">
      <el-dropdown @command="changeLang" trigger="click">
        <span class="el-dropdown-link">
          {{preprocessorList[preprocessor].name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(value, key) of preprocessorList" :key="value.name" :command="key">{{value.name}}</el-dropdown-item>
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
import langPreprocessor from '../../config/lang'
import compiler from '@/util/preprocess'
import { setting$$ } from '../../store/root'

export default {
  name: 'CodeMirror',

  data () {
    return {
      editor: null
    }
  },

  props: {
    /** Editor type: HTML, CSS, JavaScript */
    langType: {
      type: String,
      required: true,
      validator (val) {
        return langPreprocessor.hasOwnProperty(val)
      }
    }
  },

  subscriptions () {
    return {
      /** preprocessor */
      preprocessor: setting$$.map((data) => data && data.langs[this.langType]),
      indentation: setting$$.map((data) => data && data.indentation)
    }
  },

  computed: {
    preprocessorList () {
      return langPreprocessor[this.langType]
    }
  },

  mounted () {
    let subscription = setting$$.subscribe((setting) => {
      if (setting) {
        console.log(this.indentation)
        this.initEditor()
        subscription.unsubscribe()

        this.$watch('indentation', () => {
          this.setIndentation()
        })
      }
    })
  },

  methods: {
    setIndentation () {
      this.editor.setOption('tabSize', this.indentation)
    },

    initEditor () {
      let options

      if (!sessionStorage.getItem(`codemirror-${this.langType}`)) {
        options = {}
        options.codemirror = {
          mode: this.preprocessorList[this.preprocessor].mimeType,
          smartIndent: false,
          tabSize: this.indentation
        }
      } else {
        options = JSON.parse(sessionStorage.getItem(`codemirror-${this.langType}`))
        sessionStorage.removeItem(`codemirror-${this.langType}`)
      }

      if (this.preprocessorList[this.preprocessor].name === 'HTML') {
        options.codemirror.extraKeys = {
          'Tab': 'emmetExpandAbbreviation',
          'Enter': 'emmetInsertLineBreak'
        }
      }

      this.editor = CodeMirror(this.$el.querySelector('.editor-wrap'), options.codemirror)
      this.preprocessor = options.preprocessor || this.preprocessor
    },
    compile () {
      return new Promise((resolve, reject) => {
        if (this.preprocessorList[this.preprocessor].nocompile) {
          resolve(this.editor.getValue())
        } else {
          compiler[this.preprocessor](this.editor.getValue())
            .then(resolve)
            .catch((err) => {
              reject(err)
            })
        }
      })
    },
    saveTempData () {
      /**
       * Editor component will destroy when the layout change. This will make
       * editor's setting and content dispear. So we need to store
       * the setting and content in sessionStorage. When an new editor component
       * created, it can get setting and content directly from sessionStorage.
       */
      sessionStorage.setItem(`codemirror-${this.langType}`, JSON.stringify({
        codemirror: {
          value: this.editor.getValue(),
          mode: this.editor.getOption('mode')
        },
        current: this.current
      }))
    },
    changeLang (lang) {
      if (this.preprocessor !== lang) {
        this.editor.setOption('mode', this.preprocessorList[this.preprocessor].mimeType)
        this.preprocessor = lang
        this.setEmmet()
      }
    },
    setEmmet () {
      if (this.preprocessorList[this.preprocessor].name === 'HTML') {
        this.editor.setOption('extraKeys', {
          'Tab': 'emmetExpandAbbreviation',
          'Enter': 'emmetInsertLineBreak'
        })
      }
    }
  },

  beforeDestroy () {
    this.saveTempData()
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

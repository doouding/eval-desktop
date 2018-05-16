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
    <transition name="slideup">  
      <el-alert
        class="compile-info"
        v-if="errorMsg"
        type="error"
        title="编译错误"
        :description="errorMsg"
        :closable="false"
      >
      </el-alert>
    </transition>
  </div>
</template>

<script>
/**
 * @fileoverview Editor component is responsible for writing code, compile code and syntax error prompt
 */
import CodeMirror from '@/util/codemirror'
import Event from '@/util/event'
import langPreprocessor from '../../config/lang'
import compiler from '@/util/preprocess'
import { setting$$ } from '../../store/root'

export default {
  name: 'CodeMirror',

  data () {
    return {
      editor: null,
      preprocessor: null,
      indentation: 2,
      errorMsg: ''
    }
  },

  created () {
    const eventName = `snippet-${this.langType}`

    const setSnippet = (data) => {
      this.editor.setValue(data.code)
      if (data.pre) {
        this.preprocessor = data.pre
      }
    }

    Event.$on(eventName, setSnippet)

    this.$on('destroy', () => {
      Event.$off(eventName, setSnippet)
    })
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

  computed: {
    preprocessorList () {
      return langPreprocessor[this.langType]
    }
  },

  mounted () {
    let subscription = setting$$.subscribe((setting) => {
      if (setting) {
        this.preprocessor = setting.langs[this.langType]
        this.indentation = setting.indentation

        this.initEditor()
        Event.$emit('editor-loaded')

        // listener is calling synchronously so
        // the subscription is still undefined
        setTimeout(() => {
          subscription.unsubscribe()
        }, 0)

        // subscribe indentaion change and change editor option dynamic
        this._indentationChange = setting$$.subscribe((setting) => {
          this.indentation = setting.indentation
          this.setIndentation()
        })
      }
    })
  },

  methods: {
    unsubIndentationChange () {
      this._indentationChange.unsubscribe()
      this._indentationChange = null
    },

    setIndentation () {
      this.editor.setOption('tabSize', this.indentation)
    },

    initEditor () {
      let options
      let indentationSpace = ' '.repeat(this.indentation)

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
      } else {
        options.codemirror.extraKeys = {
          'Tab': function (cm) {
            cm.replaceSelection(indentationSpace, 'end')
          }
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
            .then((val) => {
              this.errorMsg = ''
              resolve(val || '')
            })
            .catch((err) => {
              let errorInfo = {
                type: this.preprocessorList[this.preprocessor].name
              }

              switch (typeof err) {
                case 'string':
                  errorInfo.message = err
                  break
                default:
                  errorInfo.message = err.message
              }
              this.errorMsg = errorInfo.message
              reject(errorInfo)
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
    this.$emit('destroy')
    this.saveTempData()
    this.unsubIndentationChange()
  }
}
</script>

<style lang="sass" scoped>
.codemirror-component
  height: 100%
  position: relative
  overflow: hidden

.editor-bar
  padding: .5em 1.2em
  background-color: #f5f5f5
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

.compile-info
  z-index: 10
  position: absolute
  bottom: 0

.slideup-enter
  transform: translateY(100%)
.slideup-enter-to
  transform: translateY(0)
.slideup-enter-active
  transition: transform .3s ease-out
.slideup-leave
  transform: translateY(0)
.slideup-leave-active
  transform: translateY(100%)
  transition: transform .3s ease-out
</style>

<script>
import Event from '@/util/event'
import CodeMirror from '@/util/codemirror'
import Iframe from '@/util/iframe'
import CSSPreprocessor from '@/util/css-preprocess'
import HTMLPreprocessor from '@/util/html-preprocess'

export default {
  name: 'EditorsArea',

  data () {
    return {
      editors: {
        js: {
          show: false,
          width: '',
          pre: 'JavaScript',
          el: null
        },
        css: {
          show: false,
          width: '',
          pre: 'CSS',
          el: null
        },
        html: {
          show: false,
          width: '',
          pre: 'HTML',
          el: null
        },
        console: {
          show: false,
          width: ''
        },
        output: {
          show: false,
          width: ''
        }
      },
      output: null
    }
  },

  mounted () {
    window.editors = this.editors
    // listen editor switch event
    Event.$on('editorSwitch', this.editorSwitch.bind(this))

    // listen compiler event
    Event.$on('compileOutput', this.compileOutput.bind(this))

    // listen fiddle event
    Event.$on('snippet', this.updateEditorContent.bind(this))

    // create editors
    this.editors.js.el = CodeMirror(document.getElementById('jsEditorWrapper'), {
      mode: 'javascript'
    })

    this.editors.css.el = CodeMirror(document.getElementById('cssEditorWrapper'), {
      mode: 'text/css',
      onChange: function (cm) { console.log('changed') }
    })

    this.editors.html.el = CodeMirror(document.getElementById('htmlEditorWrapper'), {
      mode: 'text/html',
      onChange: function (cm) { console.log('changed') }
    })

    // init output iframe
    this.output = new Iframe(document.getElementById('outPutFrame'))

    // init emmet plugin
    this.setEmmet()
  },

  methods: {
    editorSwitch (displayedEditors) {
      let width = String(100 / displayedEditors.length) + '%'

      for (let editorName in this.editors) {
        if (displayedEditors.includes(editorName)) {
          this.editors[editorName].show = true
          this.editors[editorName].width = width
        } else {
          this.editors[editorName].show = false
        }
      }
    },

    compileOutput: async function () {
      try {
        /* eslint-disable no-useless-escape */
        let docs = {
          head: '<style>' +
            (CSSPreprocessor[this.editors.css.pre].process === null
              ? this.editors.css.el.getValue()
              : await CSSPreprocessor[this.editors.css.pre].process(this.editors.css.el.getValue())) +
            '</style>',
          body: this.editors.html.el.getValue() + '<script>' + this.editors.js.el.getValue() + '<\/script>'
        }
        /* eslint-enable no-useless-escape */

        this.output.refreshContent(docs)
      } catch (e) {
        this.$message.error(e.message)
      }
    },

    updateEditorContent (content) {
      this.editors.js.el.setValue(content.js)
      this.editors.html.el.setValue(content.html)
      this.editors.css.el.setValue(content.css)
    },

    setEmmet () {
      if (this.editors.html.pre === 'HTML') {
        /** Enable emmet for html */
        this.editors.html.el.setOption('extraKeys', {
          'Tab': 'emmetExpandAbbreviation',
          'Enter': 'emmetInsertLineBreak'
        })
      } else {
        console.log('reset')
        /** Disable emmet for language other than html */
        this.editors.html.el.setOption('extraKeys', null)
      }
    },

    setPreprocessor (cmd) {
      let [editor, type] = cmd.split(' ')

      this.editors[editor].pre = type

      switch (editor) {
        case 'css':
          this.editors[editor].el.setOption('mode', CSSPreprocessor[type].mode)
          break
        case 'html':
          this.editors[editor].el.setOption('mode', HTMLPreprocessor[type].mode)
          this.setEmmet()
          break
      }
    }
  },

  computed: {
    CSSPreprocessor () {
      return Object.keys(CSSPreprocessor)
    },

    HTMLPreprocessor () {
      return Object.keys(HTMLPreprocessor)
    }
  }
}
</script>

<template>
  <div>
    <el-row type="flex" class="editors-area-wrap">
      <el-col v-show="editors.html.show" :style="{ width: editors.html.width }" class="editors" id="htmlEditorWrapper">
        <div class="editor-preprocessor">
          <i class="el-icon-setting"></i>
          <el-dropdown @command="setPreprocessor" trigger="click">
            <span class="el-dropdown-link">
              {{ editors.html.pre }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" v-once>
              <el-dropdown-item 
                v-for="value in HTMLPreprocessor"
                :key="value"
                :command="'html ' + value">{{ value }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col v-show="editors.js.show" :style="{ width: editors.js.width }" class="editors" id="jsEditorWrapper"> 
        <div class="editor-preprocessor">
          <i class="el-icon-setting"></i>
          <span class="el-dropdown-link">
          {{ editors.js.pre }}
          </span>
        </div>
      </el-col>
      <el-col v-show="editors.css.show" :style="{ width: editors.css.width }" class="editors" id="cssEditorWrapper">
        <div class="editor-preprocessor">
          <i class="el-icon-setting"></i>
          <el-dropdown @command="setPreprocessor" trigger="click">
            <span class="el-dropdown-link">
              {{ editors.css.pre }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown" v-once>
              <el-dropdown-item 
                v-for="value in CSSPreprocessor"
                :key="value"
                :command="'css ' + value">{{ value }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col v-show="editors.console.show" :style="{ width: editors.console.width }" class="editors">
        <span class="editor-name">Console</span>
      </el-col>
      <el-col v-show="editors.output.show" :style="{ width: editors.output.width }" class="editors">
        <iframe src="about:blank" frameborder="0" id="outPutFrame"></iframe>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="sass" scoped>
.editors-area-wrap
  align-items: stretch
  flex-grow: 1

.editors
  border-right: 1px solid #eee
  height: 100%
  position: relative
  display: flex
  flex-direction: column

.editor-preprocessor
  padding: 5px
  background-color: #F1F1F1
  border-bottom: 1px solid #E5E5E5
  display: flex
  padding-left: 10px
  align-items: center
  color: #D1D1D1

.editor-name
  position: absolute
  right: 0;
  top: 0;
  font-size: 12px;
  color: #888
  background-color: #eee
  z-index: 1
  padding: .2em .8em
  letter-spacing: .1em
  opacity: .6

.el-dropdown-link
  font-size: 12px
  padding: 5px
  padding-left: 1em
  letter-spacing: .08em
  display: inline-block
  cursor: pointer
  color: #5a5e66

#outPutFrame
  height: 100%
</style>

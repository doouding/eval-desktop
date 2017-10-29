<script>
import Event from '@/util/event'
import CodeMirror from '@/util/codemirror'
import Iframe from '@/util/iframe'

export default {
  name: 'EditorsArea',

  data () {
    return {
      editors: {
        js: {
          show: false,
          width: '',
          el: null
        },
        css: {
          show: false,
          width: '',
          el: null
        },
        html: {
          show: false,
          width: '',
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
    Event.$on('fiddle', this.updateEditor.bind(this))

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

    compileOutput () {
      /* eslint-disable no-useless-escape */
      let docs = {
        head: '<style>' + this.editors.css.el.getValue() + '</style>',
        body: this.editors.html.el.getValue() + '<script>' + this.editors.js.el.getValue() + '<\/script>'
      }
      /* eslint-enable no-useless-escape */

      this.output.refreshContent(docs)
    },

    updateEditor (content) {
      this.editors.js.el.setValue(content.js)
      this.editors.html.el.setValue(content.html)
      this.editors.css.el.setValue(content.css)
    }
  }

}
</script>

<template>
  <div>
    <el-row type="flex" class="editors-area-wrap">
      <el-col v-show="editors.html.show" :style="{ width: editors.html.width }" class="editors" id="htmlEditorWrapper">
        <span class="editor-name">HTML</span>
      </el-col>
      <el-col v-show="editors.js.show" :style="{ width: editors.js.width }" class="editors" id="jsEditorWrapper"> 
        <span class="editor-name">JavaScript</span>
      </el-col>
      <el-col v-show="editors.css.show" :style="{ width: editors.css.width }" class="editors" id="cssEditorWrapper">
        <span class="editor-name">CSS</span>
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

</style>
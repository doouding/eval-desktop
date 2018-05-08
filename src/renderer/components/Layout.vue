<template>
  <div class="main-layout">
    <div class="nav-wrapper">
      <top-bar 
        @layout-change="layoutChange"
        @layout-reset="layoutReset"
        @run="run">
      </top-bar>
    </div>
    <div class="main-wrapper">
      <editors-layout ref="editorLayout" :layout="layout">
        <code-mirror ref="htmlEditor" :slot="htmlEditorSlot" lang-type="html"></code-mirror>
        <code-mirror ref="jsEditor" :slot="jsEditorSlot" lang-type="javascript"></code-mirror>
        <code-mirror ref="cssEditor" :slot="cssEditorSlot" lang-type="css"></code-mirror>
        <output-frame ref="outputFrame" :slot="outputSlot"></output-frame>
      </editors-layout>
    </div>
    <modals></modals>
  </div>
</template>

<script>
import Modals from './Modals'
import EditorsLayout from './main/EditorsLayout'
import TopBar from './main/Topbar'
import CodeMirror from './common/CodeMirror'
import OutputFrame from './common/OutputFrame'
import { data as resourceList } from '@/store/resource'

export default {
  components: {
    CodeMirror,
    EditorsLayout,
    TopBar,
    OutputFrame,
    Modals
  },
  data () {
    return {
      layout: 'bottom'
    }
  },
  computed: {
    jsEditorSlot () {
      return this.layout + '-js'
    },
    htmlEditorSlot () {
      return this.layout + '-html'
    },
    cssEditorSlot () {
      return this.layout + '-css'
    },
    outputSlot () {
      return this.layout + '-output'
    }
  },
  methods: {
    layoutChange (layout) {
      this.layout = layout
    },
    layoutReset () {
      this.$refs.editorLayout.resetLayout()
    },
    run () {
      let js = this.$refs.jsEditor.compile()
      let css = this.$refs.cssEditor.compile()
      let html = this.$refs.htmlEditor.compile()

      Promise.all([html, js, css])
        .then((result) => {
          result.push(resourceList.value)
          this.$refs.outputFrame.load(...result)
        })
        .catch((e) => {
          this.$msg.error({
            message: `${e.type}: ${e.message}`,
            duration: 5000,
            showClose: true
          })
        })
    }
  }
}
</script>

<style lang="sass">
.main-layout
  display: flex
  height: 100%
  flex-direction: column

.main-wrapper
  height: calc(100% - 54px)
</style>

<template>
  <div>
    <div class="nav-wrapper">
      <top-bar></top-bar>
    </div>
    <div class="main-wrapper">
      <editors-layout :layout="layout">
        <code-mirror :slot="htmlEditorSlot" :lang="editors.html"></code-mirror>
        <code-mirror :slot="jsEditorSlot" :lang="editors.js"></code-mirror>
        <code-mirror :slot="cssEditorSlot" :lang="editors.css"></code-mirror>
        <output-frame slot="normal-output"></output-frame>
      </editors-layout>
    </div>
  </div>
</template>

<script>
import EditorsLayout from './main/EditorsLayout'
import TopBar from './main/Topbar'
import CodeMirror from './common/CodeMirror'
import OutputFrame from './common/OutputFrame'

export default {
  components: {
    CodeMirror,
    EditorsLayout,
    TopBar,
    OutputFrame
  },
  data () {
    return {
      layout: 'normal',
      editors: {
        js: 'javascript',
        css: 'css',
        html: 'html'
      }
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
    }
  }
}
</script>

<style lang="sass">
.editors-wrapper
  display: flex

</style>

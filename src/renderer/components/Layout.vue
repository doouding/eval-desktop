<template>
  <div class="main-layout">
    <div class="nav-wrapper">
      <top-bar></top-bar>
    </div>
    <div class="main-wrapper">
      <editors-layout :layout="layout">
        <code-mirror :slot="htmlEditorSlot" lang="HTML"></code-mirror>
        <code-mirror :slot="jsEditorSlot" lang="JavaScript"></code-mirror>
        <code-mirror :slot="cssEditorSlot" lang="CSS"></code-mirror>
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
      layout: 'normal'
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
.main-layout
  display: flex
  height: 100%
  flex-direction: column

.main-wrapper
  height: calc(100% - 54px)
</style>

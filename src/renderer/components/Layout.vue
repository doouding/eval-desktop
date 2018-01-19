<template>
  <div>
    <div class="nav-wrapper">
      <top-bar></top-bar>
    </div>
    <div class="main-wrapper">
      <editors-layout>
        <code-mirror :slot="htmlEditorSlot"></code-mirror>
        <code-mirror :slot="jsEditorSlot"></code-mirror>
        <code-mirror :slot="cssEditorSlot"></code-mirror>
        <output-frame></output-frame>
      </editors-layout>
    </div>
  </div>
</template>

<script>
import EditorsLayout from '../main/EditorsLayout'
import TopBar from '../main/Topbar'
import CodeMirror from '../common/CodeMirror'
import OutputFrame from '../common/OutputFrame'

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
        lang: 'js'
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

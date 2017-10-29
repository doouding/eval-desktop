<script>
import IFrame from '@/util/iframe'

export default {
  name: 'outputIFrame',

  data () {
    return {
      iframe: null
    }
  },

  mounted () {
    this.iframe = new IFrame()

    this.$el.appendChild(this.iframe.el)
  }
}
</script>

<template>
  <div>
    <div class="iframe-holder"></div>
  </div>
</template>

<style lang="sass">

</style>
<template>
  <div class="container">
    <nav-bar ref="nav"></nav-bar>
    <editors-area ref="editors" class="preview-area"></editors-area>
  </div>
</template>

<script>
  import NavBar from '@/components/LandingPage/NavBar'
  import EditorsArea from '@/components/LandingPage/EditorsArea'

  export default {
    name: 'landing-page',

    components: { NavBar, EditorsArea },

    mounted () {
      this.$refs.nav.editorSwitch()
    }
  }
</script>

<style lang="sass" scoped>
.container
  height: 100%
  display: flex
  flex-direction: column

.preview-area
  flex-grow: 1
  display: flex
  align-items: stretch
  align-content: stretch
</style>

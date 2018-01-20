<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
  import Layout from '@/components/Layout'

  export default {
    name: 'eval-desktop',
    components: {
      Layout
    }
  }
</script>

<style lang="sass">
#app
  height: 100%

body, html
  padding: 0
  margin: 0
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  height: 100%
</style>

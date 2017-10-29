<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'eval-desktop'
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

.CodeMirror
  height: 100%

.CodeMirror-wrap pre
  word-wrap: break-word
  white-space: pre-wrap
  word-break: break-word
</style>

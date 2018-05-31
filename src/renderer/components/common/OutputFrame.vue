<!--
  Check iframe sandbox setting 
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
  https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
-->

<template>
  <iframe class="iframe" ref="iframe"></iframe>
</template>

<script>
export default {
  computed: {
    iframe () {
      return this.$refs['iframe']
    }
  },

  methods: {
    load (...args) {
      let iframeWindow = this.iframe.contentWindow
      let iframeDoc = iframeWindow.document

      iframeWindow.location.reload()
      iframeDoc.open()
      iframeDoc.write(this.integrateHTML(...args))
      iframeDoc.close()
    },

    loadLibs (libs) {
      let result = ''

      for (let lib of libs) {
        /* eslint-disable */
        result += `<script src='${lib.address}'><\/script>`
        /* eslint-enable */
      }

      return result
    },

    /**
     * Intergrate code into page
     */
    integrateHTML (html, js, css, libs = []) {
      /* eslint-disable */

      return `<!DOCTYPE html>\
        <html>
          <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <meta name="renderer" content="webkit">
            <meta name="force-rendering" content="webkit">
            ${this.loadLibs(libs)}
            <style>${css}</style>
          </head>
          <body>
          ${html}
          <script>
          (function(){
            var parent = window.parent;
            window.addEventListener('error', function(e){
              parent.postMessage({
                msg:e.message
              }, '*');
            }, false);
          }());
          <\/script>
          <script>${js}<\/script>
          </body>
        </html>`
      /* eslint-enable */
    }
  }
}
</script>

<style lang="sass" scoped>
.iframe
  display: block
  height: 100%
  width: 100%
  border: 0
</style>

<!--
  Check iframe sandbox setting 
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
  https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
-->

<template>
  <div class="iframe-wrapper" style="width:100%; height:100%">
    <div v-show="cover" class="iframe-alter"></div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.iframe = document.createElement('iframe')
    this.iframe.name = 'output'
    this.iframe.frameBorder = '0'
    this.iframe.className = 'iframe'
    this.iframe.width = '100%'
    this.iframe.height = '100%'
    this.iframe.sandbox = 'allow-forms allow-modals allow-pointer-lock allow-scripts allow-popups allow-same-origin'

    this.$el.appendChild(this.iframe)

    /**
     * mousemove event listener not working on iframe element
     * so we put a "cover element" to cover iframe so that
     * mousemove event listener can run successfully
     **/
    window.addEventListener('mousedown', () => {
      this.cover = true
    }, false)
    window.addEventListener('mouseup', () => {
      this.cover = false
    }, false)
  },

  data () {
    return {
      iframe: null,
      cover: false
    }
  },

  methods: {
    load (...args) {
      this.iframe.contentWindow.location.reload()
      this.iframe.contentDocument.open()
      this.iframe.contentDocument.write(this.integrateHTML(...args))
      this.iframe.contentDocument.close()
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

      return `<DOCTYPE html>\
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
.iframe-wrapper
  position: relativen

.iframe-alter
  width: 100%
  height: 100%
  position: absolute
  top: 0
  left: 0
  bottom: 0
  right: 0
  background-color: rgba(0,0,0,0)

.iframe
  width: 100%
  height: 100%

</style>

<style lang="sass">
.iframe-wrapper
  .iframe
    display: block
</style>

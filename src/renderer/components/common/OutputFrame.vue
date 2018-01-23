<!--
  Check iframe sandbox setting 
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
  https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
-->

<template>
  <div class="iframe-wrapper" style="width:100%; height:100%">
    <div v-show="cover" class="iframe-alter"></div>
    <iframe class="iframe"
      name="output"
      frameborder="0"
      sandbox="allow-forms allow-modals allow-pointer-lock allow-scripts allow-popups allow-same-origin">
    </iframe>
  </div>
</template>

<script>
export default {
  mounted () {
    this.iframe = this.$el.querySelector('iframe[name="output"]')

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
      this.el.contentDocument.write(this.integrateHTML(...args))
      this.el.contentDocument.close()
    },

    /**
     * 将代码组合成完整的html代码
     */
    integrateHTML (html, js, css, libs) {
      /* eslint-disable */
      var libScripts = libs.map(l => '<script src="' + l.link + '><\/script>').join('')

      return `<DOCTYPE html>\
        <html>
          <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
            <meta name="renderer" content="webkit">
            <meta name="force-rendering" content="webkit">
            ${libScripts}
            <style>${css}</style>
          </head>
          <body>
          ${html}
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
  position: relative

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

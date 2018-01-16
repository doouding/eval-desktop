<!--
  Check iframe sandbox setting 
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
  https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
-->

<template>
  <div style="width:100%; height:100%">
    <iframe
      name="output"
      frameborder="0"
      sandbox="allow-forms allow-modals allow-pointer-lock allow-scripts allow-popups allow-same-origin">
    </iframe>
  </div>
</template>

<script>
export default {
  beforeMount () {
    this.iframe = this.$el.querySelector('iframe[name="output"]')
  },

  data () {
    return {
      iframe: null
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
      var libScripts = libs.map(l => `<script src="${l.link}"></script>`).join('')

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
          <script>${js}</script>
          </body>
        </html>`
      /* eslint-enable */
    }
  }
}
</script>

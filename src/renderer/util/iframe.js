class IFrame {
  constructor (iframe) {
    this.el = iframe
  }

  /**
   * Refresh html content
   * @param {Object} html
   */
  refreshContent (html) {
    this.el.contentWindow.location.reload()
    this.el.contentDocument.write(`<!DOCTYPE html><head>${html.head}</head><body>${html.body}</body>`)
    this.el.contentDocument.close()
  }
}

export default IFrame

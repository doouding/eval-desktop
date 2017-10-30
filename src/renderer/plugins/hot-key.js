import hotkeys from 'hotkeys-js'

const HotKeysPlugin = {}

/* Make hot key available on textarea */
hotkeys.filter = (e) => {
  let tagName = e.target.tagName

  if (tagName === 'INPUT' || tagName === 'SELECT') {
    return false
  } else {
    return true
  }
}

function addHotKeyRegister (Vue) {
  Vue.prototype.$registerHK = function (key, callback) {
    hotkeys(key, (e, handler) => {
      e.preventDefault()
      callback()
    })
  }
}

HotKeysPlugin.install = function (Vue, options) {
  addHotKeyRegister(Vue)
}

export default HotKeysPlugin

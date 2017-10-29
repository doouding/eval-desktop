import hotkeys from 'hotkeys-js'

const HotKeysPlugin = {}
const RegisteredKeys = []

function addHotKeyRegister (Vue) {
  Vue.prototype.$registerHK = function (key, callback) {
    if (RegisteredKeys.includes(key)) {
      console.error('Duplicated register key:' + key)
    } else {
      hotkeys(key, callback)
    }
  }
}

HotKeysPlugin.install = function (Vue, options) {
  addHotKeyRegister(Vue)
}

export default HotKeysPlugin

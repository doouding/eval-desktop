import Event from '@/util/event'
import hotkeys from 'hotkeys-js'

const APP_SCOPE = 'app'
let lastBindMap = null

export default function registerHotkeys (keys) {
  initHotKeys()

  if (!lastBindMap) {
    for (let event in lastBindMap) {
      hotkeys.unbind(lastBindMap[event], APP_SCOPE)
    }
  }

  for (let event in keys) {
    hotkeys(keys[event], APP_SCOPE, (e) => {
      e.preventDefault()
      Event.$emit(event)
    })
  }

  lastBindMap = Object.assign({}, keys)
  hotkeys.setScope(APP_SCOPE)
}

function initHotKeys () {
  hotkeys.filter = () => {
    return true
  }

  // prevent refresh page
  hotkeys('command+r,f5', 'all', (e) => {
    console.log('refresh')
    e.preventDefault()
  })
}

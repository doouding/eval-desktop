import Event from '@/util/event'
import hotkeys from 'hotkeys-js'

let lastBindMap = null

export default function registerHotkeys (keys) {
  initHotKeys()

  if (!lastBindMap) {
    for (let event in lastBindMap) {
      hotkeys.unbind(lastBindMap[event])
    }
  }

  for (let event in keys) {
    hotkeys(keys[event], (e) => {
      e.preventDefault()
      Event.$emit(event)
    })
  }

  lastBindMap = Object.assign({}, keys)
}

function initHotKeys () {
  hotkeys.filter = () => {
    return true
  }
}

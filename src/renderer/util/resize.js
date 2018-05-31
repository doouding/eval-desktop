/**
 * @fileoverview Implemention of resize editor area
 */
import Event from './event'

/**
 * Get mouse position relative to given element
 * @param {HTMLElement} el Relative elemtn
 * @param {MouseEvent} event event object, used to get cursor position
 * @return {Object} contain x,y
 */
function mouse (rect, event) {
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

/**
 * Get element size
 * @param {HTMLElement} el
 * @return {Object} contain width and height
 */
function size (el) {
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

/**
 * Add event listener for mousemove event
 * @param {*} el The area which mouse move over
 * @param {*} movecallback The mousemove event callback
 * @param {*} upCallback The mouseup event callback
 */
function move (el, moveCallback, upCallback) {
  const elSize = size(el)
  const elRect = el.getBoundingClientRect()

  const moveHander = (e) => {
    let pos = mouse(elRect, e)
    moveCallback(e, elSize, pos)
  }

  let unregister = () => {
    upCallback()
    Event.$emit('resize')
    el.removeEventListener('mousemove', moveHander, false)
    window.removeEventListener('mouseup', unregister, false)
  }

  el.addEventListener('mousemove', moveHander, false)
  window.addEventListener('mouseup', unregister, false)
}

/**
 * Return css style object contain "pointer-events" and "user-select".
 * These css properties can make animation more smoothly
 * @param {*} isMove
 */
function disableMouseEvent (isMove) {
  return isMove ? {
    pointerEvents: 'none',
    userSelect: 'none'
  } : {}
}

export default {
  move,
  mouse,
  size,
  disableMouseEvent
}

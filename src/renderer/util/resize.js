/**
 * @fileoverview Implemention of resize editor area
 */

/**
 * Get mouse position relative to given element
 * @param {HTMLElement} el Relative elemtn
 * @param {MouseEvent} event event object, used to get cursor position
 * @return {Object} contain x,y
 */
function mouse (el, event) {
  let rect = el.getBoundingClientRect()

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
 * @param {*} el 
 * @param {*} callback 
 */
function move (el, callback) {
  let unregister = () => {
    el.removeEventListener('mousemove', callback, false)
    window.removeEventListener('mouseup', unregister, false)
  }

  el.addEventListener('mousemove', callback, false)
  window.addEventListener('mouseup', unregister, false)
}

export default {
  move,
  mouse,
  size
}

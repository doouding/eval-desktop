/**
 * @fileoverview Implemention of resize editor area
 */

/**
 * Get mouse position relative to given element
 * @param {HTMLElement} el Relative elemtn
 * @param {MouseEvent} event event object, used to get cursor position
 * @return {Object} contain x,y
 */
export function mouseOfEl (el, event) {
  let rect = el.getBoundingClientRect()

  return {
    x: event.clientX - rect.x,
    y: event.clientY - rect.y
  }
}

/**
 * Get element size
 * @param {HTMLElement} el 
 * @return {Object} contain width and height
 */
export function size (el) {
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

/**
 * Get element position of relative element. if the second param is not given,
 * It will use offsetParent instead
 * @param {HTMLElement} el target element
 * @param {HTMLElement} rEl relative element
 */
export function elOfEl (el, rEl = null) {
  
}

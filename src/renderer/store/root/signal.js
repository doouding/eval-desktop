/**
 * @fileoverview Used to send signal to update root data
 */

import Rx from 'rxjs/Rx'

const rootUpdateSignal = new Rx.Subject()

export {
  rootUpdateSignal as signal$
}

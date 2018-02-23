/**
 * @fileoverview Root data of application. eg: account information, setting information
 */

import * as user from '../api/user.api'
import Rx from 'rxjs/Rx'

/** Signal Observable used to update */
const rootUpdateSignal = new Rx.Subject()

const userUpdateSignal = rootUpdateSignal
  .filter(event => event.includes('user'))
  .switchMap(() => Rx.Observable.fromPromise(user.current()))

/** Initial data observable */
const loginedUserInfo = Rx.Observable
  .fromPromise(user.current())
  .merge(userUpdateSignal)

/** Cache observable */
const userCache = new Rx.BehaviorSubject({ authenticated: false })
loginedUserInfo.subscribe(userCache)

/** Zip all observable */
export default Rx.Observable.zip(loginedUserInfo)

export {
  rootUpdateSignal as signal$,
  userCache as user$
}

/**
 * @fileoverview Root data of application. eg: account information, setting information
 */

import * as user from '../../api/user.api'
import { signal$ } from './signal'
import Rx from 'rxjs/Rx'

// user info update signal
const userUpdateSignal = signal$
  .filter(event => event.includes('user'))
  .switchMap(() => Rx.Observable.fromPromise(user.current()))

// user info
const userInfo = Rx.Observable
  .fromPromise(user.current()) // get initial info
  .merge(userUpdateSignal)

// cache user info
const userCache = new Rx.BehaviorSubject({ authenticated: false })
userInfo.subscribe(userCache)

export {
  userCache as user$$,
  userInfo as user$
}

/**
 * @fileoverview Root data of application. eg: account information, setting information
 */

import * as user from '../api/user.api'
import * as setting from '../api/setting.api'
import Rx from 'rxjs/Rx'
import DEFAULT_SETTING from '../config/setting'

/** Signal Observable used to update */
const rootUpdateSignal = new Rx.Subject()

const userUpdateSignal = rootUpdateSignal
  .filter(event => event.includes('user'))
  .switchMap(() => Rx.Observable.fromPromise(user.current()))

/** Initial data observable */
const loginedUserInfo = Rx.Observable
  .fromPromise(user.current())
  .merge(userUpdateSignal)

/**
 *  Setting update time:
 *  Emit a default setting first.
 *  Emit user's custom setting when user login.
 *  When user logout, keep user's setting unchanged
 */
const settingInfo = loginedUserInfo
  .scan((info, user) => {
    if (info.logined === false && user.authenticated === true) return { logined: true, shouldUpdate: true }
    else if (user.authenticated === false) return { logined: false, shouldUpdate: false }
    else return { logined: true, shouldUpdate: false }
  }, {logined: false, shouldUpdate: false})
  .takeWhile(data => data.shouldUpdate === true)
  .switchMap(_ => Rx.Observable.fromPromise(setting.fetch()))
  .map(s => JSON.parse(s.get('value')))

/** Cache observable */
const userCache = new Rx.BehaviorSubject({ authenticated: false })
loginedUserInfo.subscribe(userCache)

const settingCache = new Rx.BehaviorSubject({ ...DEFAULT_SETTING })
settingInfo.subscribe(settingCache)
/** Zip all observable */
export default Rx.Observable.zip(loginedUserInfo)

export {
  rootUpdateSignal as signal$,
  userCache as user$,
  settingCache as setting$
}

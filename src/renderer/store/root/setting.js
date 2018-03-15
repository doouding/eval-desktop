import Rx from 'rxjs/Rx'
import { signal$ } from './signal'
import { user$ } from './user'
import * as setting from '../../api/setting.api'
import DEFAULT_SETTING from '../../config/setting'

const settingUpdateSignal = signal$
  .filter(event => event.includes('setting'))
  .switchMap(() => Rx.Observable.fromPromise(setting.fetch()))
  .map(s => JSON.parse(s.get('value')))

const settingInfo = user$
  /**
   * scan在这里用来判断是否要更新setting值
   * 当用户从未登录状态 => 登陆状态时更新setting值
   */
  .scan((info, user) => {
    // 如果之前已经登陆，不管后面如何操作都不会更新setting
    if (info.logined === true) {
      return { logined: user.authenticated, shouldUpdate: false }
    }

    if (user.authenticated === true) {
      // 当从未登陆转到登陆状态时更新setting
      return { logined: true, shouldUpdate: true }
    } else {
      // 当未登陆时，则使用默认设置
      return { logined: false, shouldUpdate: false, default: true }
    }
  }, {logined: false, shouldUpdate: false})
  .takeWhile(data => data.shouldUpdate || data.default)
  .switchMap((data) => {
    if (data.default) {
      return Rx.Observable.from({ ...DEFAULT_SETTING })
    } else {
      return Rx.Observable
        .fromPromise(setting.fetch())
        .map((s) => { return JSON.parse(s.get('value')) })
    }
  })
  .merge(settingUpdateSignal)

// cache setting
const settingCache = new Rx.BehaviorSubject(null)
settingInfo.subscribe(settingCache)

export {
  settingInfo as setting$,
  settingCache as setting$$
}

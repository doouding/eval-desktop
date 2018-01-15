/**
 * @fileoverview 把需要使用到的 element-ui 都写在这里
 */
import 'element-ui/lib/theme-chalk/index.css'
import { Message, Notification } from 'element-ui'

export default function install (Vue) {
  Object.defineProperties(Vue.prototype, {
    '$msg': {
      value: Message
    },
    '$notify': {
      value: Notification
    }
  })
}

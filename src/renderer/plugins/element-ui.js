/**
 * @fileoverview 把需要使用到的 element-ui 都写在这里
 */
import 'element-ui/lib/theme-chalk/index.css'
import {
  Message,
  Notification,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu
} from 'element-ui'

export default function install (Vue) {
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Button)
  Vue.use(Dropdown)
  Vue.use(DropdownMenu)
  Vue.use(DropdownItem)

  Object.defineProperties(Vue.prototype, {
    '$msg': {
      value: Message
    },
    '$notify': {
      value: Notification
    }
  })
}

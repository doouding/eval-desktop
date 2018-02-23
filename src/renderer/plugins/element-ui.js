/**
 * @fileoverview 把需要使用到的 element-ui 都写在这里
 */
import 'element-ui/lib/theme-chalk/index.css'
import {
  Message,
  Notification,
  Row,
  Col,
  Dialog,
  Form,
  FormItem,
  Button,
  Input,
  Menu,
  MenuItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  MessageBox
} from 'element-ui'

export default function install (Vue) {
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Button)
  Vue.use(Dropdown)
  Vue.use(DropdownMenu)
  Vue.use(DropdownItem)
  Vue.use(Dialog)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Menu)
  Vue.use(MenuItem)

  Object.defineProperties(Vue.prototype, {
    '$msg': {
      value: Message
    },
    '$notify': {
      value: Notification
    },
    '$confirm': {
      value: MessageBox.confirm
    }
  })
}

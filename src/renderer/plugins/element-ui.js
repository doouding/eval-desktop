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
  Select,
  Option,
  MenuItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  MessageBox,
  Tooltip,
  Autocomplete,
  Tag,
  Badge
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
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Tooltip)
  Vue.use(Autocomplete)
  Vue.use(Tag)
  Vue.use(Badge)

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

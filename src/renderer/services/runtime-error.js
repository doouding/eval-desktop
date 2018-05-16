import { Notification } from 'element-ui'

function runtimeErrorNofiy () {
  window.addEventListener('message', (e) => {
    if (e.data.msg) {
      Notification.error({
        title: '运行错误',
        message: e.data.msg,
        position: 'bottom-right',
        duration: 0
      })
    }
  }, false)
}

runtimeErrorNofiy()

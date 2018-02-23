<template>
  <div>
    <login-dialog ref="loginDialog"></login-dialog>
    <register-dialog ref="registerDialog"></register-dialog>
    <setting-dialog ref="settingDialog"></setting-dialog>
  </div>
</template>

<script>
import loginDialog from './modals/LoginDialog'
import registerDialog from './modals/RegisterDialog'
import settingDialog from './modals/SettingDialog'
import Event from '../util/event'

export default {
  created () {
    Event.$on('dialog', (val) => {
      this.$refs[val].show()
    })
  },

  components: {
    loginDialog,
    registerDialog,
    settingDialog
  }
}
</script>

<style lang="sass">
</style>

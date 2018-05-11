<template>
  <div>
    <login-dialog ref="loginDialog"></login-dialog>
    <register-dialog ref="registerDialog"></register-dialog>
    <setting-dialog ref="settingDialog"></setting-dialog>
    <resource-dialog ref="resourceDialog"></resource-dialog>
    <snippets-list-dialog ref="codeRepoDialog"></snippets-list-dialog>
  </div>
</template>

<script>
import loginDialog from './modals/LoginDialog'
import registerDialog from './modals/RegisterDialog'
import settingDialog from './modals/SettingDialog'
import resourceDialog from './modals/ResourceDialog'
import snippetsListDialog from './modals/SnippetsListDialog'
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
    settingDialog,
    resourceDialog,
    snippetsListDialog
  }
}
</script>

<style lang="sass">
</style>

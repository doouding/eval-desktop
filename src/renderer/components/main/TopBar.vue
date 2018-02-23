<template>
  <div class="top-bar">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col :span="6" class="nav-left">
        <el-button type="primary" size="small" @click="run">
          <span>
            <i class="eval-icon play left"></i>
            运行
          </span>
        </el-button>
        <el-button type="primary" size="small" plain>
          <span>
            <i class="eval-icon upload left"></i>
            上传
          </span></el-button>
      </el-col>
      <el-col :span="8" class="nav-right">
        <span>
          <el-button class="layout-action" type="text" :class="{ 'is-full': !isFullResult}" @click="switchFull">
            <span>
              <i class="eval-icon fullscreen"></i>
            </span>
          </el-button>
          <el-dropdown class="layout-action" @command="switchLayout" trigger="click">
            <span class="layout-dropdown-link">
              <i class="eval-icon layout" style="font-size: 1.1em"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="normal">
                <span class="layout-item">
                  <i class="eval-icon normal"></i>
                </span>
              </el-dropdown-item>
              <el-dropdown-item command="bottom">
                <span class="layout-item">
                  <i class="eval-icon result-bottom"></i>
                </span>
              </el-dropdown-item>
              <el-dropdown-item command="right">
                <span class="layout-item">
                  <i class="eval-icon result-right"></i>
                </span>
              </el-dropdown-item>
              <el-dropdown-item command="columns">
                <span class="layout-item">
                  <i class="eval-icon columns"></i>
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button class="layout-action" type="text" @click="resetLayout">
            <span>
              <i class="eval-icon reset" style="font-size: 1.3em"></i>
            </span>
          </el-button>
          <el-button class="layout-action" type="text" @click="showLoginDialog" v-if="!user$$.authenticated">
            <span class="action-text">登陆</span>
          </el-button>
          <el-button class="layout-action" type="text" @click="showRegisterDialog" v-if="!user$$.authenticated">
            <span class="action-text">注册</span>
          </el-button>
          <el-dropdown class="layout-action" @command="openSetting" v-if="user$$.authenticated" trigger="click">
            <span class="layout-dropdown-link">
              <i class="eval-icon setting" style="font-size: 1.1em"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="codeRepoDialog">
                <span class="setting-item">
                  我的代码库
                </span>
              </el-dropdown-item>
              <el-dropdown-item command="settingDialog">
                <span class="setting-item">
                  我的设置
                </span>
              </el-dropdown-item>
              <el-dropdown-item command="logOut">
                <span class="setting-item">
                  退出
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { user$ } from '../../store/root'
import Event from '../../util/event'

export default {
  data () {
    return {
      isFullResult: false
    }
  },

  subscriptions () {
    return {
      user$$: user$
    }
  },

  methods: {
    switchFull () {
      this.isFullResult = !this.isFullResult
      this.$emit('fullresult', this.isFullResult)
    },

    switchLayout (layout) {
      this.$emit('layout-change', layout)
    },

    resetLayout () {
      this.$emit('layout-reset')
    },

    run () {
      this.$emit('run')
    },

    openSetting (command) {
      if (command === 'codeRepoDialog' || command === 'settingDialog') {
        Event.$emit('dialog', command)
      }
    },

    showLoginDialog () {
      Event.$emit('dialog', 'loginDialog')
    },

    showRegisterDialog () {
      Event.$emit('dialog', 'registerDialog')
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~style-variable'

.top-bar
  position: relative
  z-index: 6
  padding: 5px 15px
  background-color: #fafafa
  /* Rectangle: */
  background: #FDFDFD;
  box-shadow: 0 1px 0 0 #EBEBEB, 0 0 8px 0 rgba(0,0,0,0.07);

.nav-left
  text-align: left

.nav-right
  text-align: right

.is-full
  color: #666!important

.layout-action
  margin-left: .7em

.layout-dropdown-link
  color: $theme-color
  cursor: pointer

.layout-item
  font-size: 20px

.setting-item
  font-size: 13px

.action-text
  font-weight: 200
  font-size: 13px
  position: relative
  bottom: 2px
</style>

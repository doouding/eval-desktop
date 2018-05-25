<template>
  <div class="top-bar">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col :span="12" class="nav-left">
        <el-button type="text" size="medium" @click="run">
          <span>
            <i class="eval-icon play left"></i>
            运行
          </span>
        </el-button>
        <el-button type="text" size="medium" @click="upload">
          <span>
            <i class="eval-icon upload left"></i>
            保存
          </span>
        </el-button>
        <el-button type="text" size="medium" @click="newSnippet">
          <span>
            <i class="eval-icon new left"></i>
            新建
          </span>
        </el-button>
        <span class="separator">|</span>
        <el-button type="text" size="medium" @click="shareCode" 
          v-if="$snippet.snippet && $snippet.snippet.id && $snippet.snippet.get('owner').id === user$$.objectId"
        >
          <span>
            <i class="eval-icon share left"></i>
            分享
          </span>
        </el-button>
        <el-button type="text" size="medium" @click="loadCode"
          v-if="user$$.authenticated"
        >
          <span>
            <i class="eval-icon load left"></i>
            加载
          </span>
        </el-button>
        <el-button type="text" size="medium" @click="forkCode"
          v-if="$snippet.snippet && $snippet.snippet.get('owner').id !== user$$.objectId"
        >
          <span>
            <i class="eval-icon fork left"></i>
            fork
          </span>
        </el-button>
      </el-col>
      <el-col :span="8" class="nav-right">
        <el-tooltip placement="bottom" content="点击添加外部资源">
          <el-badge :value="resourceCount" class="badge-item">
            <span class="external" @click="addResource">外部资源</span>
          </el-badge>
        </el-tooltip>
        <span class="tools-btn">
          <el-button class="layout-action" type="text" :class="{ 'is-full': !isFullResult}" @click="switchFull">
            <span>
              <i class="eval-icon fullscreen"></i>
            </span>
          </el-button>
          <el-dropdown class="layout-action" @command="switchLayout" trigger="click">
            <span class="layout-dropdown-link">
              <i class="eval-icon layout" style="top: .08em;font-size: 1.1em"></i>
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
              <i class="eval-icon reset" style="font-size: 1.3em;top:.09em"></i>
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
              <i class="eval-icon setting" style="top: .05em;font-size: 1.1em"></i>
              {{user$$.username}}
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
import { user$$, signal$ } from '@/store/root'
import { data as resourceList$, fetch } from '@/store/resource'
import * as user from '@/api/user.api'
import Event from '@/util/event'

export default {
  data () {
    return {
      isFullResult: false
    }
  },

  subscriptions () {
    return {
      user$$: user$$,
      resourceCount: resourceList$.map(list => list.length)
    }
  },

  methods: {
    newSnippet () {
      Event.$emit('snippet-javascript', {
        code: ''
      })
      Event.$emit('snippet-css', {
        code: ''
      })
      Event.$emit('snippet-html', {
        code: ''
      })
      fetch([])
      this.$snippet.destroy()
      Event.$emit('run')
    },

    shareCode () {
      this.$alert(`分享ID为：${this.$snippet.snippet.id}`, '分享', {
        confirmButtonText: '确定'
      })
    },

    snippetIDPrompt () {
      return this.$prompt('输入分享ID', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
    },

    loadCode () {
      let loading
      this.snippetIDPrompt()
        .then(({ value }) => {
          loading = this.$loading({
            lock: true,
            fullscreen: true,
            text: '载入中',
            background: 'rgba(255, 255, 255, 0.8)'
          })
          this.$snippet.createWithId(value)
          return this.$snippet.fetch()
        })
        .then((snippet) => {
          Event.$emit('snippet-javascript', {
            code: snippet.get('js_code'),
            pre: snippet.get('js_pre')
          })
          Event.$emit('snippet-css', {
            code: snippet.get('css_code'),
            pre: snippet.get('css_pre')
          })
          Event.$emit('snippet-html', {
            code: snippet.get('html_code')
          })
          fetch(snippet.get('external_list'))
          this.dialogVisible = false
          window.debug = this.$snippet
          loading.close()
        })
    },

    forkCode () {
      Event.$emit('upload', `fork-${this.$snippet.snippet.get('name')}`)
    },

    addResource () {
      Event.$emit('dialog', 'resourceDialog')
    },

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
      Event.$emit('run')
    },

    upload () {
      Event.$emit('upload')
    },

    openSetting (command) {
      if (command === 'codeRepoDialog' || command === 'settingDialog') {
        Event.$emit('dialog', command)
      } else {
        user.logOut()
        signal$.next(['user'])
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

.external
  font-size: 12px
  color: #777
  padding-right: .5em
  border-radius: 4px
  line-height: 15px
  display: inline-block
  cursor: pointer

.top-bar
  position: relative
  z-index: 6
  padding: 5px 8px
  background-color: #fafafa
  /* Rectangle: */
  background: #FDFDFD;
  box-shadow: 0 1px 0 0 #EBEBEB, 0 0 4px 0 rgba(0,0,0,0.03);

.nav-left
  text-align: left
  margin-left: 20px
  .el-button
    font-weight: 100
    color: #666
    &:hover
      color: #409EFF

  .el-button + .el-button
      margin-left: 25px

.separator
  color: #BBB
  margin: 0 15px
  font-weight: 100

.nav-right
  text-align: right
  user-select: none
  margin-right: 20px

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

.tools-btn
  margin-left: 1em

.layout-action
  .eval-icon
    position: relative
</style>

<style lang="sass">
.badge-item
  & > .el-badge__content.is-fixed
    background-color: #666
    font-size: 11px
    cursor: default
</style>

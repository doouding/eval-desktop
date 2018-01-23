<template>
  <div class="top-bar">
    <el-row type="flex" justify="space-between" align="middle">
      <el-col :span="6" class="nav-left">
        <el-button type="primary" size="small">
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
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFullResult: false
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
      this.$emit('layoutReset')
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
  margin-right: .7em

.layout-dropdown-link
  color: $theme-color
  cursor: pointer

.layout-item
  font-size: 20px
</style>

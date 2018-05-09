<template>
  <el-dialog
    class="setting-dialog"
    title="设置"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
    width="600px"
    center>
    <el-row class="inner" v-if="setting !== null">
      <el-col :span="6" class="nav">
        <el-menu
          class="menu"
          default-active="1"
          @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-edit-outline"></i>
            <span>编辑器设置</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-sort"></i>
            <span>快捷键设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <div v-if="index === '1'" class="setting-panel">
          <el-form size="small" label-width="150px">
            <el-form-item label="HTML 预处理器">
              <el-select v-model="setting.langs.html">
                <el-option :label="item.name" :key="item.name" :value="key" v-for="(item, key) in langPreprocessor.html"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="JavaScript 预处理器">
              <el-select v-model="setting.langs.javascript">
                <el-option :label="item.name" :key="item.name" :value="key" v-for="(item, key) in langPreprocessor.javascript"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="CSS 预处理器">
              <el-select v-model="setting.langs.css">
                <el-option :label="item.name" :key="item.name" :value="key" v-for="(item, key) in langPreprocessor.css"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="缩进宽度">
              <el-input v-model="setting.indentation" min="2" type="number" class="setting-input-width"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div></div>
      </el-col>
    </el-row>
    <div slot="footer">
      <el-button type="primary" size="medium" @click="saveSetting" :loading="saving">{{ saving ? '保存中' : '确定' }}</el-button>
      <el-button @click="dialogVisible = false">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { setting$$, signal$ } from '@/store/root'
import langs from '@/config/lang'
import * as setting from '@/api/setting.api'

export default {
  data () {
    return {
      dialogVisible: false,
      index: '1',
      saving: false
    }
  },

  subscriptions: {
    setting: setting$$
  },

  computed: {
    langPreprocessor () {
      return langs
    }
  },

  methods: {
    show () {
      this.dialogVisible = true
    },
    handleClose (done) {
      done()
    },
    handleSelect (index) {
      this.index = index
    },
    saveSetting () {
      this.saving = true
      setting.update(this.setting)
        .then(() => {
          signal$.next(['setting'])
          this.saving = false
        })
    }
  }
}
</script>

<style lang="sass">
.setting-dialog .el-dialog__body
  padding: 0px !important
  border-top: 1px solid #e6e6e6
  border-bottom: 1px solid #e6e6e6

.setting-dialog .el-dialog__footer
  padding: 10px 15px !important

.setting-dialog .inner
  height: 360px

.setting-dialog .nav,
.setting-dialog .menu
  height: 100%

.setting-panel
  padding: 28px 30px 25px 25px
.setting-input-width > .el-input__inner
  width: 193px
</style>

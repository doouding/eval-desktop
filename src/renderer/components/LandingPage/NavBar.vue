<script>
import Event from '@/util/event'
import JSFiddleFetch from '@/components/LandingPage/JSFiddleFetch'

export default {
  name: 'NavBar',

  components: {
    'js-fiddle': JSFiddleFetch
  },

  data () {
    return {
      displayedEditor: ['js', 'html', 'css'],
      fetchJSFiddle: false
    }
  },

  mounted () {
    window.nav = this
    // register run shortcut
    this.$registerHK('command+s,ctrl+s', this.compileOutput.bind(this))
  },

  methods: {
    compileOutput () {
      Event.$emit('compileOutput')
    },

    editorSwitch () {
      Event.$emit('editorSwitch', this.displayedEditor)
    },

    showJSFiddle () {
      this.fetchJSFiddle = true
    }
  },

  watch: {
    displayedEditor () {
      this.editorSwitch()
    }
  }
}
</script>

<template>
  <div>
    <el-row type="flex" justify="space-between" class="nav-bar">

      <el-col :span="3">
        <el-button size="small" icon="el-icon-refresh" plain @click="compileOutput">Refresh</el-button>
      </el-col>

      <el-col :span="10">
        <el-checkbox-group v-model="displayedEditor" size="small">
          <el-checkbox-button label="js">JavaScript</el-checkbox-button>
          <el-checkbox-button label="html">HTML</el-checkbox-button>
          <el-checkbox-button label="css">CSS</el-checkbox-button>
          <el-checkbox-button label="console">Console</el-checkbox-button>
          <el-checkbox-button label="output">Output</el-checkbox-button>
        </el-checkbox-group>
      </el-col>

      <el-col :span="6">
        <el-button size="small">保存至 Gist</el-button>
        <el-button size="small" @click="showJSFiddle">从 JSFiddle 加载</el-button>
      </el-col>

      <el-col :span="3" style="text-align:right;">
        <el-dropdown style="padding: 5px 0; cursor: pointer;">
          <span class="el-dropdown-link">
          <i class="el-icon-setting"></i>设置<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置快捷键</el-dropdown-item>
            <el-dropdown-item>配置 Gist</el-dropdown-item>
            <el-dropdown-item>管理 Boilerplate</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>

    </el-row>

    <js-fiddle :visible.sync="fetchJSFiddle"></js-fiddle>
  </div>
</template>

<style lang="sass" scoped>
.nav-bar
  padding: 10px
  border-bottom: 1px solid #eee
</style>

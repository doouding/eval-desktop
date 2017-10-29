<script>
import JSFiddleFetch from '@/util/js-fiddle-fetch'
import Event from '@/util/event'

export default {
  data () {
    return {
      url: '',
      loading: false
    }
  },

  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    loadJSFiddle () {
      let inValide = false
      let timeout = 10000
      this.loading = true

      JSFiddleFetch(this.url)
        .then((content) => {
          Event.$emit('fiddle', content)
          if (!inValide) {
            this.loading = false
            this.dialogVisible = false
            inValide = true
          }
        })
        .catch((error) => {
          if (!inValide) {
            this.$message.error(error.message)
            this.loading = false
          }
        })

      setTimeout(() => {
        if (!inValide) {
          this.loading = false
          this.inValide = true
          inValide = true
          this.$message.error('请求超时，请检查网络')
        }
      }, timeout)
    },

    closeHandler (done) {
      if (!this.loading) {
        done()
      }
    }
  },

  computed: {
    dialogVisible: {
      set (val) {
        this.$emit('update:visible', val)
      },

      get () {
        return this.visible
      }
    }
  }
}
</script>

<template>
  <div>
    <el-dialog title="加载 JSFiddle 内容"
      @open="url = ''"
      :before-close="closeHandler"
      :visible.sync="dialogVisible">
      <el-input v-model="url" :disable="loading" placeholder="请输入有效的JSFiddle地址"></el-input>
      <span slot="footer">
        <el-button type="primary" :loading="loading" @click="loadJSFiddle">确定</el-button>
        <el-button @click="dialogVisible = false" :disabled="loading" plain>取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style>
</style>
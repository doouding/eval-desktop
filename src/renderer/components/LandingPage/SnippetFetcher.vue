<script>
import snippetFetcher from '@/util/snippet-fetcher'
import Event from '@/util/event'

export default {
  data () {
    return {
      url: '',
      loading: false,
      type: 'JSFiddle'
    }
  },

  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    loadSnippet () {
      let inValide = false
      let timeout = 10000
      this.loading = true

      snippetFetcher(this.type, this.url)
        .then((content) => {
          Event.$emit('snippet', content)
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
    <el-dialog title="加载Snippets"
      @open="url = ''"
      :before-close="closeHandler"
      :visible.sync="dialogVisible">
      <el-radio-group class="snippets-type" v-model="type">
        <el-radio label="CodePen">CodePen</el-radio>
        <el-radio label="JSFiddle">JSFiddle</el-radio>
      </el-radio-group>
      <el-input v-model="url" :disable="loading" :placeholder="'请输入有效的' + type + '地址'"></el-input>
      <span slot="footer">
        <el-button type="primary" :loading="loading" @click="loadSnippet">确定</el-button>
        <el-button @click="dialogVisible = false" :disabled="loading" plain>取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="sass" scoped>
.snippets-type
  margin-bottom: 20px
</style>
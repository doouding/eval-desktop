<template>
  <div class="main-layout">
    <div class="nav-wrapper">
      <top-bar 
        @layout-change="layoutChange"
        @layout-reset="layoutReset"
      >
      </top-bar>
    </div>
    <div class="main-wrapper">
      <editors-layout ref="editorLayout" :layout="layout">
        <code-mirror ref="htmlEditor" :slot="htmlEditorSlot" lang-type="html"></code-mirror>
        <code-mirror ref="jsEditor" :slot="jsEditorSlot" lang-type="javascript"></code-mirror>
        <code-mirror ref="cssEditor" :slot="cssEditorSlot" lang-type="css"></code-mirror>
        <output-frame ref="outputFrame" :slot="outputSlot"></output-frame>
      </editors-layout>
    </div>
    <modals></modals>
  </div>
</template>

<script>
import Modals from './Modals'
import EditorsLayout from './main/EditorsLayout'
import Event from '@/util/event'
import * as uploadService from '@/services/upload'
import TopBar from './main/Topbar'
import CodeMirror from './common/CodeMirror'
import OutputFrame from './common/OutputFrame'
import { data as resourceList } from '@/store/resource'
import { user$$ } from '@/store/root'

export default {
  components: {
    CodeMirror,
    EditorsLayout,
    TopBar,
    OutputFrame,
    Modals
  },
  data () {
    return {
      layout: 'bottom'
    }
  },
  subscriptions: {
    user: user$$
  },
  created () {
    let loadedCount = 0
    const editorLoad = () => {
      loadedCount++
      if (loadedCount === 3) {
        Event.$off('editor-loaded', editorLoad)
        loading.close()
      }
    }
    const loading = this.loading()

    Event.$on('run', () => {
      this.run()
    })
    Event.$on('upload', () => {
      this.upload()
    })
    Event.$on('editor-loaded', editorLoad)
  },
  computed: {
    jsEditorSlot () {
      return this.layout + '-js'
    },
    htmlEditorSlot () {
      return this.layout + '-html'
    },
    cssEditorSlot () {
      return this.layout + '-css'
    },
    outputSlot () {
      return this.layout + '-output'
    }
  },
  methods: {
    loading () {
      return this.$loading({
        lock: true,
        fullscreen: true,
        text: '加载中',
        background: 'rgba(255, 255, 255, 0.5)'
      })
    },
    layoutChange (layout) {
      this.layout = layout
    },
    layoutReset () {
      this.$refs.editorLayout.resetLayout()
    },
    mergeSnippet () {
      let js = this.$refs.jsEditor.compile()
      let css = this.$refs.cssEditor.compile()
      let html = this.$refs.htmlEditor.compile()

      return Promise.all([html, js, css])
        .then((result) => {
          result.push(resourceList.value)
          return result
        })
        .catch(() => {})
    },
    async upload () {
      if (!this.user.authentification) {
        Event.$emit('dialog', 'loginDialog')
        setTimeout(() => {
          this.$msg.error('需要登陆账号才能保存')
        })
        return
      }

      let currentSnippet = uploadService.current()
      let snippetName

      if (!currentSnippet) {
        try {
          snippetName = (await this.promptSnippetName()).value
        } catch (_) {
          this.$msg.warning('用户取消保存')
          return
        }
        currentSnippet = uploadService.create()
      }

      let data = {
        html_code: this.$refs.htmlEditor.editor.getValue(),
        js_code: this.$refs.jsEditor.editor.getValue(),
        css_code: this.$refs.cssEditor.editor.getValue(),
        external_list: resourceList.value,
        js_pre: this.$refs.jsEditor.preprocessor,
        css_pre: this.$refs.cssEditor.preprocessor
      }

      if (snippetName) {
        data.name = snippetName
      }

      currentSnippet.set(data)

      currentSnippet.save()
        .then(() => {
          this.$msg.success('保存成功')
        })
        .catch(() => {
          this.$msg.error('保存失败')
        })
    },
    run () {
      this.mergeSnippet()
        .then((result) => {
          this.$refs.outputFrame.load(...result)
        })
    },
    promptSnippetName () {
      return this.$prompt('为代码取个名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{2,10}$/,
        inputErrorMessage: '名称长度应该大于2个字符小于10个字符'
      })
    }
  }
}
</script>

<style lang="sass">
.main-layout
  display: flex
  height: 100%
  flex-direction: column

.main-wrapper
  height: calc(100% - 54px)
</style>

<template>
  <el-dialog
    title="代码仓库"
    :visible.sync="dialogVisible"
    width="400px"
    class="snippet-dialog"
    center
  >
    <el-card
      v-for="snippet in snippetList"
      :body-style="{ padding: '15px 15px 5px' }"
      class="snippet-item"
      shadow="hover"
      :key="snippet.id"
    >
      <div
        class="name"
        @click="fetch(snippet)"
      >
        {{snippet.get('name')}}
      </div>
      <div class="meta">
        <time class="time">{{ formatDate(snippet.get('createdAt')) }}</time>
        <el-tag size="mini">{{snippet.get('js_pre')}}</el-tag>
        <el-tag size="mini" type="success">{{snippet.get('css_pre')}}</el-tag>
      </div>
    </el-card>
    <el-pagination
      class="snippet-page"
      small
      layout="prev, pager, next"
      @current-change="pageSwitch"
      :page-count="totalPage">
    </el-pagination>
  </el-dialog>
</template>

<script>
import Snippet from '@/api/snippet.api'
import * as uploadService from '@/services/upload'
import Event from '@/util/event'
import { fetch } from '@/store/resource'

function appendZero (num) {
  if (!(String(num).length - 1)) {
    return '0' + String(num)
  } else {
    return num
  }
}

export default {
  data () {
    return {
      dialogVisible: false,
      snippetList: [],
      totalSnippet: 0,
      totalPage: 0,
      currentPage: 1,
      pageSize: 5
    }
  },

  watch: {
    dialogVisible (newVal) {
      if (newVal) {
        Promise
          .all([Snippet.list(this.currentPage, this.pageSize), Snippet.meta(this.pageSize)])
          .then((result) => {
            let [list, meta] = result

            this.snippetList = list
            this.totalSnippet = meta[0]
            this.totalPage = meta[1]
          })
      }
    }
  },

  methods: {
    show () {
      this.dialogVisible = true
    },
    fetch (snippet) {
      let snippetModel = uploadService.fetch(snippet)
      snippetModel
        .get()
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
        })
    },
    formatDate (date) {
      date = new Date(date)
      return `${date.getFullYear()}-${appendZero(date.getMonth() + 1)}-${appendZero(date.getDate())} ${appendZero(date.getHours())}:${appendZero(date.getMinutes())}`
    },
    pageSwitch (page) {
      this.currentPage = page
      Snippet.list(this.currentPage, this.pageSize)
        .then((list) => {
          this.snippetList = list
        })
    }
  }
}
</script>

<style lang="sass">
.snippet-dialog
  .el-dialog__body
    padding: 10px 25px

.snippet-page
  margin-top: 10px

.snippet-item
  cursor: pointer
  user-select: none
  & + &
    margin-top: .5em
  .name
    font-size: 16px
    font-weight: bold
    transition: color .3s ease-out
    &:hover
      color: #409EFF
  .time
    font-size: 12px
    color: #999
    margin-right: 2em

</style>

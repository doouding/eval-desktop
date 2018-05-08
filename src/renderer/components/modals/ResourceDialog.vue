<template>
  <el-dialog
    title="添加资源"
    :visible.sync="dialogVisible"
    width="400px"
    center>
    <el-autocomplete
      class="search-box"
      v-model="resourceName"
      :fetch-suggestions="queryLibResource"
      @select="addResource"
      placeholder="请输入库或框架的名称"
    ></el-autocomplete>
    <div class="resource-list" ref="resourceList">
      <div class="resource-empty" v-if="!resourceList || resourceList.length === 0">
        当前没有加载第三方库
      </div>
      <div class="resource-item" :class="{'holder': item.hover}" :key="item.name + item.version" v-for="(item, index) in resourceList">
        <span class="eval-icon drag" @mousedown="dragResource(index)"></span>
        <span class="name">{{item.name}}</span>
        <el-tag>{{item.version}}</el-tag>
        <span class="eval-icon del" @click="delResource(index)"></span>
      </div>
      <div class="resource-item drag" :style="{top:`${dragTop}px`}" v-if="dragElement">
        <span class="eval-icon drag"></span>
        <span class="name">{{dragElement.name}}</span>
        <el-tag>{{dragElement.version}}</el-tag>
        <span class="eval-icon del"></span>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import * as resourceAPI from '@/api/resource.api'
import { add, del, sort, data } from '@/store/resource'

export default {
  data () {
    return {
      dialogVisible: false,
      resourceName: '',
      dragElement: null,
      dragTop: null
    }
  },

  subscriptions: {
    resourceList: data
  },

  methods: {
    show () {
      this.dialogVisible = true
    },
    addResource (item) {
      this.resourceName = ''
      add(item)
    },
    delResource (index) {
      del(index)
    },
    sortResource (from, to) {
      sort(from, to)
    },
    dragResource (startIndex) {
      let resourceList = this.resourceList
      let delEl = Object.assign({ hover: true }, resourceList.splice(startIndex, 1)[0])
      let itemPositions = []
      let maxIndex
      let lastIndex = -1
      let listRect
      const self = this

      this.dragElement = Object.assign({}, delEl)
      this.$nextTick(() => {
        let resourceListEl = this.$refs['resourceList']
        listRect = resourceListEl.getBoundingClientRect()
        let itemEls = Array.prototype.slice.call(resourceListEl.querySelectorAll('.resource-item'))
        maxIndex = itemEls.length - 2

        itemEls.forEach((el, index) => {
          let rect = el.getBoundingClientRect()
          if (index > maxIndex) return

          itemPositions.push({
            index,
            top: rect.top,
            bottom: rect.bottom
          })
        })

        document.addEventListener('mousemove', selectEl, false)
        document.addEventListener('mouseup', dropEl, false)
      })
      this.$forceUpdate()

      function dropEl (e) {
        self.dragElement = null
        dropLastHolder()
        if (lastIndex === -1) lastIndex = startIndex
        self.sortResource(startIndex, lastIndex)
        document.removeEventListener('mousemove', selectEl, false)
        document.removeEventListener('mouseup', dropEl, false)
      }

      function dropLastHolder () {
        if (lastIndex === -1) return

        resourceList.splice(lastIndex, 1)
      }

      function insertHolder (current, insertAfter = false) {
        if (current === maxIndex && insertAfter) {
          resourceList.push(delEl)
          lastIndex = current + 1
        } else {
          resourceList.splice(current, 0, delEl)
          lastIndex = current
        }
      }

      function selectEl (e) {
        let currentIndex
        let posOffect = 23
        self.dragTop = e.clientY - listRect.top - posOffect

        dropLastHolder()
        let hoverBefore = itemPositions.filter((el) => el.top + posOffect > e.clientY)[0]
        if (hoverBefore) {
          currentIndex = hoverBefore.index
          insertHolder(currentIndex)
        } else {
          currentIndex = maxIndex
          insertHolder(currentIndex, true)
        }
      }
    },
    queryLibResource (queryString, cb) {
      let modeReg = /^([a-zA-Z.]+)\s(([\d]\.?)*)$/
      let regResult = modeReg.exec(queryString)

      if (!regResult) {
        resourceAPI.approxi(queryString)
          .then((result) => {
            let suggestions = []

            result.results.map((resource) => {
              suggestions.push({
                value: `${resource.name} ${resource.version}`,
                name: resource.name,
                address: resource.latest,
                version: resource.version
              })
            })

            cb(suggestions)
          })
      } else {
        let libName = regResult[1]
        let libVersion = regResult[2]

        resourceAPI.precise(libName)
          .then((result) => {
            let suggestions = []
            let name
            let filename

            if (!result.assets) {
              cb(suggestions)
              return
            } else {
              name = result.name
              filename = result.filename
            }

            result.assets
              .filter(asset => asset.version.includes(libVersion))
              .map((asset) => {
                suggestions.push({
                  value: `${name} ${asset.version}`,
                  name: name,
                  address: `http//cdnjs.cloudflare.com/ajax/libs/${name}/${asset.version}/${asset.files.filter(assetName => assetName === filename)}`,
                  version: asset.version
                })
              })

            cb(suggestions)
          })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.search-box
  width: 100%

.resource-list
  margin-top: 20px
  padding-top: 13px
  border-top: 1px solid #eee
  position: relative

.resource-empty
  text-align: center
  color: #999

.resource-item
  padding: .5em 0
  user-select: none
  overflow: hidden
  &.drag
    width: 346px
    height: 46px
    box-sizing: border-box
    position: absolute
    left: 0
    opacity: .5
  &.holder
    opacity: .5
    border: 1px dashed #999
    padding-right: .5em
    border-radius: 6px
  & > .name
    padding-right: 1em
    padding-left: .4em
  & > .eval-icon.del
    line-height: 32px
    float: right
    cursor: pointer
  & > .eval-icon.drag
    cursor: move
</style>

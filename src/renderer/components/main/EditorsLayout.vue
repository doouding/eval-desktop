<template>
  <div :class="[layout]" class="editor-layout" ref="main">
    <template v-if="layout === 'normal'">
      <div ref="normalLeftArea" class="left" :style="normalGutter.left">
        <div class="editor-wrapper" :style="normalGutter.leftArea.top">
          <slot name="normal-html"></slot>
        </div>
        <div class="gutter vertical" @mousedown="normalResize('LeftArea')"></div>
        <div class="editor-wrapper" :style="normalGutter.leftArea.bottom">
          <slot name="normal-js"></slot>
        </div>
      </div>
      <div class="gutter horizontal" @mousedown="normalResize('Main')"></div>
      <div ref="normalRightArea" class="right" :style="normalGutter.right">
        <div class="editor-wrapper" :style="normalGutter.rightArea.top">
          <slot name="normal-css"></slot>
        </div>
        <div class="gutter vertical" @mousedown="normalResize('RightArea')"></div>
        <div class="container-wrapper" :style="normalGutter.rightArea.bottom">
          <slot name="normal-output"></slot>
        </div>
      </div>
    </template>
    <template v-else-if="layout === 'columns'">
      <div :style="columnsGutter.col1" ref="columnsFirst">
        <slot name="columns-html"></slot>
      </div>
      <div class="gutter horizontal" @mousedown="columnsResize('First')"></div>
      <div :style="columnsGutter.col2" ref="columnsSecond">
        <slot name="columns-js"></slot>
      </div>
      <div class="gutter horizontal" @mousedown="columnsResize('Second')"></div>
      <div :style="columnsGutter.col3" ref="columnsThird">
        <slot name="columns-css"></slot>
      </div>
      <div class="gutter horizontal" @mousedown="columnsResize('Third')"></div>
      <div :style="columnsGutter.col4" ref="columnsForth">
        <slot name="columns-output"></slot>
      </div>
    </template>
    <template v-else-if="layout === 'bottom'">
      <div>
        <div>
          <slot name="aside-html"></slot>
        </div>
        <div class="gutter"></div>
        <div>
          <slot name="aside-js"></slot>
        </div>
        <div class="gutter"></div>
        <div>
          <slot name="aside-css"></slot>
        </div>
      </div>
      <div class="gutter"></div>
      <div>
        <slot name="aside-output"></slot>
      </div>
    </template>
    <template v-else-if="layout === 'right'">
      <div>
        <div>
          <slot name="aside-html"></slot>
        </div>
        <div class="gutter"></div>
        <div>
          <slot name="aside-js"></slot>
        </div>
        <div class="gutter"></div>
        <div>
          <slot name="aside-css"></slot>
        </div>
      </div>
      <div class="gutter"></div>
      <div>
        <slot name="aside-output"></slot>
      </div>
    </template>
  </div>
</template>

<script>
import resize from '@/util/resize'

/**
 * layout has three type: columns, normal, result-bottom, result-right
 */
export default {
  data () {
    return {
      normal: {
        left: 50,
        right: 50,
        leftArea: {
          top: 50,
          bottom: 50
        },
        rightArea: {
          top: 50,
          bottom: 50
        }
      },
      columns: {
        col1: 25,
        col2: 25,
        col3: 25,
        col4: 25
      }
    }
  },
  computed: {
    normalGutter () {
      return {
        left: {
          width: `calc(${this.normal.left}% - 0.5px)`
        },
        right: {
          width: `calc(${this.normal.right}% - 0.5px)`
        },
        leftArea: {
          top: {
            height: `calc(${this.normal.leftArea.top}% - 0.5px)`
          },
          bottom: {
            height: `calc(${this.normal.leftArea.bottom}% - 0.5px)`
          }
        },
        rightArea: {
          top: {
            height: `calc(${this.normal.rightArea.top}% - 0.5px)`
          },
          bottom: {
            height: `calc(${this.normal.rightArea.bottom}% - 0.5px)`
          }
        }
      }
    },
    columnsGutter () {
      return {
        col1: {
          width: `calc(${this.columns.col1}% - 0.5px)`
        },
        col2: {
          width: `calc(${this.columns.col2}% - 0.5px)`
        },
        col3: {
          width: `calc(${this.columns.col3}% - 0.5px)`
        },
        col4: {
          width: `calc(${this.columns.col4}% - 1px)`
        }
      }
    }
  },
  props: {
    layout: {
      type: String,
      required: true,
      validator (val) {
        return ['normal', 'columns', 'aside', 'bottom'].includes(val)
      }
    }
  },
  methods: {
    normalResize (gutter) {
      let relativeEl = this.$refs['normal' + gutter] || this.$refs.main

      resize.move(relativeEl, (e) => {
        let size = resize.size(relativeEl)
        let pos = resize.mouse(relativeEl, e)

        switch (gutter) {
          case 'Main':
            this.normal.left = pos.x / size.width * 100
            this.normal.right = (size.width - pos.x) / size.width * 100
            break
          case 'LeftArea':
            this.normal.leftArea.top = pos.y / size.height * 100
            this.normal.leftArea.bottom = (size.width - pos.y) / size.height * 100
            break
          case 'RightArea':
            this.normal.rightArea.top = pos.y / size.height * 100
            this.normal.rightArea.bottom = (size.width - pos.y) / size.height * 100
        }
      })
    },
    columnsResize (gutter) {
      let relativeEl = this.$refs.main

      resize.move(relativeEl, (e) => {
        let size = resize.size(relativeEl)
        let pos = resize.mouse(relativeEl, e)

        switch (gutter) {
          case 'First':
            this.columns.col1 = pos.x / size.width * 100
            this.columns.col2 = 100 - this.columns.col1 - this.columns.col3 - this.columns.col4
            break
          case 'Second':
            this.columns.col2 = pos.x / size.width * 100 - this.columns.col1
            this.columns.col3 = 100 - this.columns.col1 - this.columns.col2 - this.columns.col4
            break
          case 'Third':
            this.columns.col3 = pos.x / size.width * 100 - this.columns.col1 - this.columns.col2
            this.columns.col4 = 100 - this.columns.col1 - this.columns.col2 - this.columns.col3
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.editor-layout
  display: flex
  height: 100%

.gutter
  background-color: #e8e8e8
  &::after
    content: ''
    position: absolute
    display: block
    z-index: 11

.gutter.horizontal
  width: 1px
  cursor: col-resize
  position: relative
  &::after
    width: 8px
    height: 100%
    left: -3px

.gutter.vertical
  height: 1px
  width: 100%
  cursor: row-resize
  position: relative
  &::after
    height: 8px
    width: 100%
    top: -3px

.normal
  flex-direction: row
  align-items: stretch
  > .left,
  > .right
    height: 100%
    > .gutter
      height: 1px
      width: 100%

.columns
  flex-direction: row
  align-items: stretch
</style>

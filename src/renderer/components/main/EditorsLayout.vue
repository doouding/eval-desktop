<template>
  <div :class="[layout + '-layout']" class="editor-layout" ref="main">
    <template v-if="layout === 'normal'">
      <div ref="normalLeftArea" :style="normalGutter.left">
        <div class="editor-wrapper" :style="normalGutter.leftArea.top">
          <slot name="normal-html"></slot>
        </div>
        <div class="gutter vertical" @mousedown="normalResize('LeftArea')"></div>
        <div class="editor-wrapper" :style="normalGutter.leftArea.bottom">
          <slot name="normal-js"></slot>
        </div>
      </div>
      <div class="gutter horizontal" @mousedown="normalResize('Main')"></div>
      <div ref="normalRightArea" :style="normalGutter.right">
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
      <div ref="bottomTopArea" :style="bottomGutter.top" class="top">
        <div :style="bottomGutter.topArea.col1">
          <slot name="bottom-html"></slot>
        </div>
        <div class="gutter horizontal" @mousedown="bottomResize('TopFirst')"></div>
        <div :style="bottomGutter.topArea.col2">
          <slot name="bottom-js"></slot>
        </div>
        <div class="gutter horizontal" @mousedown="bottomResize('TopSecond')"></div>
        <div :style="bottomGutter.topArea.col3">
          <slot name="bottom-css"></slot>
        </div>
      </div>
      <div class="gutter vertical" @mousedown="bottomResize('Main')"></div>
      <div :style="bottomGutter.bottom" class="bottom">
        <slot name="bottom-output"></slot>
      </div>
    </template>
    <template v-else-if="layout === 'right'">
      <div ref="righLeftArea" class="left" :style="rightGutter.left">
        <div class="left" :style="rightGutter.leftArea.row1">
          <slot name="right-html"></slot>
        </div>
        <div class="gutter vertical" @mousedown="rightResize('leftAreaFirst')"></div>
        <div :style="rightGutter.leftArea.row2">
          <slot name="right-js"></slot>
        </div>
        <div class="gutter vertical" @mousedown="rightResize('leftAreaSecond')"></div>
        <div :style="rightGutter.leftArea.row3">
          <slot name="right-css"></slot>
        </div>
      </div>
      <div class="gutter horizontal" @mousedown="rightResize('Main')"></div>
      <div class="right" :style="rightGutter.right">
        <slot name="right-output"></slot>
      </div>
    </template>
  </div>
</template>

<script>
import resize from '@/util/resize'
import Event from '@/util/event'

/**
 * layout has three type: columns, normal, result-bottom, result-right
 */
export default {
  data () {
    return {
      normal: {
        left: {
          width: 50,
          move: false
        },
        right: {
          width: 50,
          move: false
        },
        leftArea: {
          top: {
            height: 50,
            move: false
          },
          bottom: {
            height: 50,
            move: false
          }
        },
        rightArea: {
          top: {
            height: 50,
            move: false
          },
          bottom: {
            height: 50,
            move: false
          }
        }
      },
      columns: {
        col1: {
          width: 25,
          move: false
        },
        col2: {
          width: 25,
          move: false
        },
        col3: {
          width: 25,
          move: false
        },
        col4: {
          width: 25,
          move: false
        }
      },
      bottom: {
        top: {
          height: 50,
          move: false
        },
        bottom: {
          height: 50,
          move: false
        },
        topArea: {
          col1: {
            width: 33.33,
            move: false
          },
          col2: {
            width: 33.33,
            move: false
          },
          col3: {
            width: 33.34,
            move: false
          }
        }
      },
      right: {
        left: {
          width: 50,
          move: false
        },
        right: {
          width: 50,
          move: false
        },
        leftArea: {
          row1: {
            height: 33.33,
            move: false
          },
          row2: {
            height: 33.33,
            move: false
          },
          row3: {
            height: 33.34,
            move: false
          }
        }
      }
    }
  },
  computed: {
    normalGutter () {
      return {
        left: {
          width: `calc(${this.normal.left.width}% - 0.5px)`,
          ...resize.disableMouseEvent(this.normal.left.move)
        },
        right: {
          width: `calc(${this.normal.right.width}% - 0.5px)`,
          ...resize.disableMouseEvent(this.normal.right.move)
        },
        leftArea: {
          top: {
            height: `calc(${this.normal.leftArea.top.height}% - 0.5px)`,
            ...resize.disableMouseEvent(this.normal.leftArea.top.move)
          },
          bottom: {
            height: `calc(${this.normal.leftArea.bottom.height}% - 0.5px)`,
            ...resize.disableMouseEvent(this.normal.leftArea.bottom.move)
          }
        },
        rightArea: {
          top: {
            height: `calc(${this.normal.rightArea.top.height}% - 0.5px)`,
            ...resize.disableMouseEvent(this.normal.rightArea.top.move)
          },
          bottom: {
            height: `calc(${this.normal.rightArea.bottom.height}% - 0.5px)`,
            ...resize.disableMouseEvent(this.normal.rightArea.bottom.move)
          }
        }
      }
    },
    columnsGutter () {
      return {
        col1: {
          width: `calc(${this.columns.col1.width}% - 0.5px)`,
          ...resize.disableMouseEvent(this.columns.col1.move)
        },
        col2: {
          width: `calc(${this.columns.col2.width}% - 0.5px)`,
          ...resize.disableMouseEvent(this.columns.col2.move)
        },
        col3: {
          width: `calc(${this.columns.col3.width}% - 0.5px)`,
          ...resize.disableMouseEvent(this.columns.col3.move)
        },
        col4: {
          width: `calc(${this.columns.col4.width}% - 1px)`,
          ...resize.disableMouseEvent(this.columns.col4.move)
        }
      }
    },
    bottomGutter () {
      return {
        top: {
          height: `calc(${this.bottom.top.height}% - 0.5px)`,
          ...resize.disableMouseEvent(this.bottom.top.move)
        },
        bottom: {
          height: `calc(${this.bottom.bottom.height}% - 0.5px)`,
          ...resize.disableMouseEvent(this.bottom.bottom.move)
        },
        topArea: {
          col1: {
            width: `calc(${this.bottom.topArea.col1.width}% - 0.5px)`,
            ...resize.disableMouseEvent(this.bottom.topArea.col1.move)
          },
          col2: {
            width: `calc(${this.bottom.topArea.col2.width}% - 0.5px)`,
            ...resize.disableMouseEvent(this.bottom.topArea.col2.move)
          },
          col3: {
            width: `calc(${this.bottom.topArea.col3.width}% - 1px)`,
            ...resize.disableMouseEvent(this.bottom.topArea.col3.move)
          }
        }
      }
    },
    rightGutter () {
      return {
        left: {
          width: `calc(${this.right.left.width}% - 0.5px)`,
          ...resize.disableMouseEvent(this.right.left.move)
        },
        right: {
          width: `calc(${this.right.right.width}% - 0.5px)`,
          ...resize.disableMouseEvent(this.right.right.move)
        },
        leftArea: {
          row1: {
            height: `calc(${this.right.leftArea.row1.height}% - 0.5px)`,
            ...resize.disableMouseEvent(this.right.leftArea.row1.move)
          },
          row2: {
            height: `calc(${this.right.leftArea.row2.height}% - 0.5px)`,
            ...resize.disableMouseEvent(this.right.leftArea.row2.move)
          },
          row3: {
            height: `calc(${this.right.leftArea.row3.height}% - 1px)`,
            ...resize.disableMouseEvent(this.right.leftArea.row3.move)
          }
        }
      }
    }
  },
  props: {
    layout: {
      type: String,
      required: true,
      validator (val) {
        return ['normal', 'columns', 'right', 'bottom'].includes(val)
      }
    }
  },
  methods: {
    normalResize (gutter) {
      let relativeEl = this.$refs['normal' + gutter] || this.$refs.main
      let mouseMove
      let mouseUp

      switch (gutter) {
        case 'Main':
          this.normal.left.move = true
          this.normal.right.move = true
          mouseMove = (e, size, pos) => {
            this.normal.left.width = pos.x / size.width * 100
            this.normal.right.width = (size.width - pos.x) / size.width * 100
          }
          mouseUp = () => {
            this.normal.left.move = false
            this.normal.right.move = false
          }
          break
        case 'LeftArea':
          this.normal.leftArea.top.move = true
          this.normal.leftArea.bottom.move = true
          mouseMove = (e, size, pos) => {
            this.normal.leftArea.top.height = pos.y / size.height * 100
            this.normal.leftArea.bottom.height = (size.height - pos.y) / size.height * 100
          }
          mouseUp = () => {
            this.normal.leftArea.top.move = false
            this.normal.leftArea.bottom.move = false
          }
          break
        case 'RightArea':
          this.normal.rightArea.top.move = true
          this.normal.rightArea.bottom.move = true
          mouseMove = (e, size, pos) => {
            this.normal.rightArea.top.height = pos.y / size.height * 100
            this.normal.rightArea.bottom.height = (size.height - pos.y) / size.height * 100
          }
          mouseUp = () => {
            this.normal.rightArea.top.move = false
            this.normal.rightArea.bottom.move = false
          }
          break
      }

      resize.move(relativeEl, mouseMove, mouseUp)
    },
    columnsResize (gutter) {
      let relativeEl = this.$refs.main
      let mouseMove
      let mouseUp

      switch (gutter) {
        case 'First':
          this.columns.col1.move = true
          this.columns.col2.move = true
          mouseMove = (e, size, pos) => {
            this.columns.col1.width = pos.x / size.width * 100
            this.columns.col2.width = 100 - this.columns.col1.width - this.columns.col3.width - this.columns.col4.width
          }
          mouseUp = () => {
            this.columns.col1.move = false
            this.columns.col2.move = false
          }
          break
        case 'Second':
          this.columns.col2.move = true
          this.columns.col3.move = true
          mouseMove = (e, size, pos) => {
            this.columns.col2.width = pos.x / size.width * 100 - this.columns.col1.width
            this.columns.col3.width = 100 - this.columns.col1.width - this.columns.col2.width - this.columns.col4.width
          }
          mouseUp = () => {
            this.columns.col2.move = false
            this.columns.col3.move = false
          }
          break
        case 'Third':
          this.columns.col3.move = true
          this.columns.col4.move = true
          mouseMove = (e, size, pos) => {
            this.columns.col3.width = pos.x / size.width * 100 - this.columns.col1.width - this.columns.col2.width
            this.columns.col4.width = 100 - this.columns.col1.width - this.columns.col2.width - this.columns.col3.width
          }
          mouseUp = () => {
            this.columns.col3.move = false
            this.columns.col4.move = false
          }
          break
      }

      resize.move(relativeEl, mouseMove, mouseUp)
    },
    bottomResize (gutter) {
      let relativeEl
      let mouseMove
      let mouseUp

      if (gutter === 'Main') {
        relativeEl = this.$refs.main
      } else {
        relativeEl = this.$refs.bottomTopArea
      }

      switch (gutter) {
        case 'Main':
          this.bottom.top.move = true
          this.bottom.bottom.move = true
          mouseMove = (e, size, pos) => {
            this.bottom.top.height = pos.y / size.height * 100
            this.bottom.bottom.height = 100 - this.bottom.top.height
          }
          mouseUp = () => {
            this.bottom.top.move = false
            this.bottom.bottom.move = false
          }
          break
        case 'TopFirst':
          this.bottom.topArea.col1.move = true
          this.bottom.topArea.col2.move = true
          mouseMove = (e, size, pos) => {
            this.bottom.topArea.col1.width = pos.x / size.width * 100
            this.bottom.topArea.col2.width = 100 - this.bottom.topArea.col1.width - this.bottom.topArea.col3.width
          }
          mouseUp = () => {
            this.bottom.topArea.col1.move = false
            this.bottom.topArea.col2.move = false
          }
          break
        case 'TopSecond':
          this.bottom.topArea.col2.move = true
          this.bottom.topArea.col3.move = true
          mouseMove = (e, size, pos) => {
            this.bottom.topArea.col2.width = pos.x / size.width * 100 - this.bottom.topArea.col1.width
            this.bottom.topArea.col3.width = 100 - this.bottom.topArea.col1.width - this.bottom.topArea.col2.width
          }
          mouseUp = () => {
            this.bottom.topArea.col2.move = false
            this.bottom.topArea.col3.move = false
          }
          break
      }

      resize.move(relativeEl, mouseMove, mouseUp)
    },
    rightResize (gutter) {
      let relativeEl
      let mouseMove
      let mouseUp

      if (gutter === 'Main') {
        relativeEl = this.$refs.main
      } else {
        relativeEl = this.$refs.righLeftArea
      }

      switch (gutter) {
        case 'Main':
          this.right.left.move = true
          this.right.right.move = true
          mouseMove = (e, size, pos) => {
            this.right.left.width = pos.x / size.width * 100
            this.right.right.width = (size.width - pos.x) / size.width * 100
          }
          mouseUp = () => {
            this.right.left.move = false
            this.right.right.move = false
          }
          break
        case 'leftAreaFirst':
          this.right.leftArea.row1.move = true
          this.right.leftArea.row2.move = true

          mouseMove = (e, size, pos) => {
            this.right.leftArea.row1.height = pos.y / size.height * 100
            this.right.leftArea.row2.height = 100 - this.right.leftArea.row1.height - this.right.leftArea.row3.height
          }
          mouseUp = () => {
            this.right.leftArea.row1.move = false
            this.right.leftArea.row2.move = false
          }
          break
        case 'leftAreaSecond':
          this.right.leftArea.row2.move = true
          this.right.leftArea.row3.move = true

          mouseMove = (e, size, pos) => {
            this.right.leftArea.row2.height = pos.y / size.height * 100 - this.right.leftArea.row1.height
            this.right.leftArea.row3.height = 100 - this.right.leftArea.row1.height - this.right.leftArea.row2.height
          }
          mouseUp = () => {
            this.right.leftArea.row2.move = false
            this.right.leftArea.row3.move = false
          }
          break
      }

      resize.move(relativeEl, mouseMove, mouseUp)
    },
    resetLayout () {
      Object.assign(this.$data, this.$options.data())
      Event.$emit('resize')
    }
  }
}
</script>

<style lang="sass" scoped>
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

.editor-layout
  height: 100%

.bottom-layout
  > .top
    > div
      float: left
      height: 100%

.right-layout
  > div
    float: left
    height: 100%

.normal-layout
  > div
    float: left
    height: 100%

.columns-layout
  > div
    float: left
    height: 100%
</style>

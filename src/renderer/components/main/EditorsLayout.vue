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
        <slot name="aside-output"></slot>
      </div>
    </template>
    <template v-else-if="layout === 'right'">
      <div ref="righLeftArea" :style="rightGutter.left">
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
      <div :style="rightGutter.right">
        <slot name="right-output"></slot>
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
      },
      bottom: {
        top: 50,
        bottom: 50,
        topArea: {
          col1: 33.33,
          col2: 33.33,
          col3: 33.34
        }
      },
      right: {
        left: 50,
        right: 50,
        leftArea: {
          row1: 33.33,
          row2: 33.33,
          row3: 33.34
        }
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
    },
    bottomGutter () {
      return {
        top: {
          height: `calc(${this.bottom.top}% - 0.5px)`
        },
        bottom: {
          height: `calc(${this.bottom.bottom}% - 0.5px)`
        },
        topArea: {
          col1: {
            width: `calc(${this.bottom.topArea.col1}% - 0.5px)`
          },
          col2: {
            width: `calc(${this.bottom.topArea.col2}% - 0.5px)`
          },
          col3: {
            width: `calc(${this.bottom.topArea.col3}% - 1px)`
          }
        }
      }
    },
    rightGutter () {
      return {
        left: {
          width: `calc(${this.right.left}% - 0.5px)`
        },
        right: {
          width: `calc(${this.right.right}% - 0.5px)`
        },
        leftArea: {
          row1: {
            height: `calc(${this.right.leftArea.row1}% - 0.5px)`
          },
          row2: {
            height: `calc(${this.right.leftArea.row2}% - 0.5px)`
          },
          row3: {
            height: `calc(${this.right.leftArea.row3}% - 1px)`
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

      resize.move(relativeEl, (e, size, pos) => {
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

      resize.move(relativeEl, (e, size, pos) => {
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
    },
    bottomResize (gutter) {
      let relativeEl
      if (gutter === 'Main') {
        relativeEl = this.$refs.main
      } else {
        relativeEl = this.$refs.bottomTopArea
      }

      resize.move(relativeEl, (e, size, pos) => {
        switch (gutter) {
          case 'Main':
            this.bottom.top = pos.y / size.height * 100
            this.bottom.bottom = 100 - this.bottom.top
            break
          case 'TopFirst':
            this.bottom.topArea.col1 = pos.x / size.width * 100
            this.bottom.topArea.col2 = 100 - this.bottom.topArea.col1 - this.bottom.topArea.col3
            break
          case 'TopSecond':
            this.bottom.topArea.col2 = pos.x / size.width * 100 - this.bottom.topArea.col1
            this.bottom.topArea.col3 = 100 - this.bottom.topArea.col1 - this.bottom.topArea.col2
            break
        }
      })
    },
    rightResize (gutter) {
      let relativeEl
      if (gutter === 'Main') {
        relativeEl = this.$refs.main
      } else {
        relativeEl = this.$refs.righLeftArea
      }

      resize.move(relativeEl, (e, size, pos) => {
        switch (gutter) {
          case 'Main':
            this.right.left = pos.x / size.width * 100
            this.right.right = (size.width - pos.x) / size.width * 100
            break
          case 'leftAreaFirst':
            this.right.leftArea.row1 = pos.y / size.height * 100
            this.right.leftArea.row2 = 100 - this.right.leftArea.row1 - this.right.leftArea.row3
            break
          case 'leftAreaSecond':
            this.right.leftArea.row2 = pos.y / size.height * 100 - this.right.leftArea.row1
            this.right.leftArea.row3 = 100 - this.right.leftArea.row1 - this.right.leftArea.row2
            break
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

.bottom
  flex-direction: column
  align-items: stretch
  > .top
    display: flex
    align-items: stretch

.right
  flex-direction: row
  align-items: stretch
  > .left
    display: flex
    flex-direction: column
    align-items: stretch
</style>

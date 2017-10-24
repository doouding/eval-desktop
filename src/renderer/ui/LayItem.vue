<script>
import { isInterger } from 'lodash'

const ALIGN_TYPE = ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch']

export default {
  name: 'ELItem',

  props: {
    /** 是否是填充剩余空间 */
    filled: {
      type: Boolean,
      default: false
    },

    /** 项目宽度 */
    width: {
      type: Number,
      validator: function (value) {
        return isInterger(value) && value < 100
      },
      required: true
    },

    /** 对齐方式 */
    align: {
      type: String,
      validator: function (value) {
        return ALIGN_TYPE.includes(value)
      },
      default: 'auto'
    }
  },

  computed: {
    itemStyle () {
      let style = { alignSelf: this.align }

      if (this.filled) {
        style['flexGrow'] = 1
      }

      return style
    }
  }
}

</script>

<template>
  <div :style="itemStyle" class="e-litem"></div>
</template>

<style lang="sass">  
</style>
<script>
const DIRECTION_TYPE = ['row', 'row-reverse', 'column', 'column-reverse']
const WRAP_TYPE = ['nowrap', 'wrap', 'wrap-reverse']
const JUSTIFY_TYPE = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around']
const ALIGN_TYPE = ['flex-start', 'flex-end', 'center', 'baseline', 'stretch']

export default {
  name: 'ELayout',

  props: {
    /** 布局方向 */
    direction: {
      type: String,
      default: 'row',
      validator: function (value) {
        return DIRECTION_TYPE.includes(value)
      }
    },

    /** 换行规则 */
    wrap: {
      type: String,
      default: 'nowrap',
      validator: function (value) {
        return WRAP_TYPE.includes(value)
      }
    },

    /** 主轴对齐方式 */
    justify: {
      type: String,
      default: 'flex-start',
      validator: function (value) {
        return JUSTIFY_TYPE.includes(value)
      }
    },

    /** 交叉轴上如何对齐 */
    align: {
      type: String,
      default: 'flex-start',
      validator: function (value) {
        return ALIGN_TYPE.includes(value)
      }
    },

    /** 容器宽度 */
    width: {
      type: String,
      default: '100%',
      validator: function (value) {
        let pxUnit = /^[1-9][0-9]px$/
        let precentUnit = /^[1-9][0-9]%$/
 
        return pxUnit.test(value) || precentUnit.test(value)
      }
    }
  },

  computed: {
    flexFlow () {
      return `${this.direction} ${this.wrap}`
    }
  }
}
</script>

<template>
  <div class="e-container" :style="{ flexFlow: flexFlow, justifyContent: justify, alignItems: align }"></div>
</template>

<style lang="sass">
.e-container
  display: flex
</style>
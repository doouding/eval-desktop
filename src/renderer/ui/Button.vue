<script>
import { sizeMixin } from './ui'

const BUTTON_STYLE = {
  'solid': 'e-btn--solid',
  'hollow': 'e-btn--hollow'
}

export default {
  name: 'EButton',

  mixins: [sizeMixin],

  props: {
    /** 按钮样式 */
    style: {
      type: String,
      default: 'solid',
      validator: function (value) {
        return BUTTON_STYLE.hasOwnProperty(value)
      }
    }
  },

  computed: {
    btnClass () {
      let classArray = []

      classArray.push(this.sizeClass)
      classArray.push(BUTTON_STYLE[this.style])

      return classArray
    }
  },

  methods: {
    handleClick(event){
      this.$emit('click', event)
    }
  }
}
</script>

<template>
  <button v-once @click="handleClick" class="e-button" :class="btnClass">
    <slot></slot>
  </button>
</template>

<style lang="sass">
@import '../style/var'

// 通用按钮样式
.e-button
  border-style: solid
  border-width: 1px

.e-button:disabled
  cursor: not-allowed

// 实心按钮样式
.e-btn--solid
  background-color: $primary-color
  border-color: $primary-color
  color: #fff

.el-btn-sold:hover
  background-color: $hover-color
  border-color: $hover-color

.el-btn-sold:active
  background-color: $active-color
  border-color: $active-color

.e-btn--solid:disabled
  background-color: $disabled-bg-color
  color: $disabled-font-color
  border-color: $disabled-font-color

// 空心按钮样式
.e-btn--hollow
  background-color: #fff
  border-color: #fff
  color: $primary-color

.e-btn-hollow:hover
  color: $hover-color

.e-btn-hollow:active
  color: $active-color

.e-btn--hollow:disabled
  background-color: #fff
  color: $disabled-font-color
  border-color: $disabled-font-color

</style>

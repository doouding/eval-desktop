<template>
  <div :class="[layout]" class="editor-layout">
    <template v-if="layout === 'normal'">
      <div class="left">
        <div>
          <slot name="normal-html"></slot>
        </div>
        <div class="gutter" @keypress=""></div>
        <div>
          <slot name="normal-js"></slot>
        </div>
      </div>
      <div class="gutter" @keypress=""></div>
      <div class="right">
        <div>
          <slot name="normal-css"></slot>
        </div>
        <div class="gutter" @keypress=""></div>
        <div>
          <slot name="normal-output"></slot>
        </div>
      </div>
    </template>
    <template v-else-if="layout === 'columns'">
      <div>
        <slot name="columns-html"></slot>
      </div>
      <div class="gutter"></div>
      <div>
        <slot name="columns-js"></slot>
      </div>
      <div class="gutter"></div>
      <div>
        <slot name="columns-css"></slot>
      </div>
      <div class="gutter"></div>
      <div>
        <slot name="columns-output"></slot>
      </div>
    </template>
    <template v-else>
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
/**
 * layout has three type: columns, normal, result-bottom, result-right
 */
export default {
  data () {
    return {}
  },
  props: {
    layout: {
      type: String,
      validator (val) {
        return ['normal', 'columns', 'aside', 'bottom'].includes(val)
      }
    }
  },
  methods: {

  }
}
</script>

<style lang="sass" scoped>
.editor-layout
  display: flex

.gutter
  width: 1px
  cursor: col-resize

.normal
  flex-direction: row
  align-items: stretch
  > .left,
  > .right
    > .gutter
      height: 1px
      width: 100%

.columns
  flex-direction: row
  align-item: stretch

.aside
  flex-direction: row
  align-item: stretch

.bottom
  flex-direction: column
  & > .gutter
    height: 1px
    width: 100%
    cursor: row-resize

</style>

<template>
  <div :class="[layout]" class="editor-layout">
    <template v-if="layout === 'normal'">
      <div class="left" style="width: calc(50% - 0.5px)">
        <div>
          <slot name="normal-html"></slot>
        </div>
        <div class="gutter"></div>
        <div>
          <slot name="normal-js"></slot>
        </div>
      </div>
      <div class="gutter" style="width: 1px"></div>
      <div class="right" style="width: calc(50% - 0.5px)">
        <div>
          <slot name="normal-css"></slot>
        </div>
        <div class="gutter"></div>
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
/**
 * layout has three type: columns, normal, result-bottom, result-right
 */
export default {
  data () {
    return {
      normal: {

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

  }
}
</script>

<style lang="sass" scoped>
.editor-layout
  display: flex

.gutter
  width: 1px
  cursor: col-resize
  background-color: #e8e8e8

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

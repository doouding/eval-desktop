<script>
import { sizeMixin } from './ui'

export default {
  name: 'EInput',

  mixins: [sizeMixin],

  data () {
    return {
      currentVal: this.value
    }
  },

  props: {
    placeholder: String,
    value: [String, Number]
  },

  methods: {
    handleInput (event) {
      let val = event.target.value

      this.$emit('input', val)
    }
  },

  computed: {
    inputClass () {
      let classArray = []

      classArray.push(this.sizeClass)
      classArray.push(size.sizeMap(this.size))

      return classArray
    }
  }
}
</script>

<template>
  <input type="text" class="e-input" :placeholder="placeholder" :class="inputClass" :value="currentVal" @input="handleInput" v-once>
</template>

<style lang="sass">
@import '../style/var'

.e-input
  border: 1px solid $primary-color

</style>
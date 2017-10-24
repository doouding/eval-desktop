import '../style/ui.sass'

const UI_SIZE = {
  'large': 'e--large',
  'med': 'e--med',
  'small': 'e--small',
  'tiny': 'e--tiny'
}

const sizeMixin = {
  props: {
    size: {
      type: String,
      required: true,
      validator: function (value) {
        return UI_SIZE.hasOwnProperty(value)
      }
    }
  },

  computed: {
    sizeClass () {
      return UI_SIZE[this.size]
    }
  }
}

export default {
  sizeMixin
}

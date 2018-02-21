<template>
  <div class="codemirror-component">
    <div class="editor-bar">
      <el-dropdown @command="changeLang" trigger="click">
        <span class="el-dropdown-link">
          {{langList[current].name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) of langList" :key="item.mimeType" :command="index">{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="editor-wrap"></div>
  </div>
</template>

<script>
/**
 * @fileoverview Editor component is responsible for writing code, compile code and syntax error prompt
 */
import CodeMirror from '@/util/codemirror'
import preprocessor from '@/util/preprocess'

const LANG_MODE_MAP = {
  'CSS': [
    {
      name: 'CSS',
      mimeType: 'text/css'
    },
    {
      name: 'Scss',
      mimeType: 'text/x-scss'
    },
    {
      name: 'Sass',
      mimeType: 'text-sass'
    }
  ],

  'HTML': [
    {
      name: 'HTML',
      mimeType: 'text/html'
    }
  ],

  'JavaScript': [
    {
      name: 'JavaScript',
      mimeType: 'text/javascript'
    }
  ]
}

const EMMET_ENABLE = ['HTML']

export default {
  name: 'CodeMirror',

  mounted () {
    let options

    if (!sessionStorage.getItem(`codemirror-${this.lang}`)) {
      options = {}
      options.codemirror = {
        mode: LANG_MODE_MAP[this.lang][0].mimeType
      }
    } else {
      options = JSON.parse(sessionStorage.getItem(`codemirror-${this.lang}`))
      sessionStorage.removeItem(`codemirror-${this.lang}`)
    }

    if (EMMET_ENABLE.includes(this.langList[this.current].name)) {
      options.codemirror.extraKeys = {
        'Tab': 'emmetExpandAbbreviation',
        'Enter': 'emmetInsertLineBreak'
      }
    }

    this.editor = CodeMirror(this.$el.querySelector('.editor-wrap'), options.codemirror)
    this.current = options.current || 0
  },

  data () {
    return {
      current: 0,
      editor: null
    }
  },

  computed: {
    langList () {
      return LANG_MODE_MAP[this.lang]
    }
  },

  props: {
    lang: {
      type: String,
      required: true,
      validator (val) {
        return LANG_MODE_MAP.hasOwnProperty(val)
      }
    }
  },

  methods: {
    compile () {
      return new Promise((resolve, reject) => {
        if (!preprocessor[this.langList[this.current].name]) {
          resolve(this.editor.getValue())
        } else {
          preprocessor[this.langList[this.current].name](this.editor.getValue())
            .then(resolve)
            .catch((err) => {
              reject(err)
            })
        }
      })
    },
    changeLang (langIndex) {
      if (this.current !== langIndex) {
        this.editor.setOption('mode', this.langList[langIndex].mimeType)
        this.current = langIndex
        this.setEmmet()
      }
    },
    setEmmet () {
      if (EMMET_ENABLE.includes(this.langList[this.current].name)) {
        this.editor.setOption('extraKeys', {
          'Tab': 'emmetExpandAbbreviation',
          'Enter': 'emmetInsertLineBreak'
        })
      }
    }
  },

  beforeDestroy () {
    /**
     * Editor component will destroy when the layout change. This will make
     * editor's setting and content dispear. So we need to store
     * the setting and content in sessionStorage. When an alternative editor component
     * created, it can get setting and content directly from sessionStorage.
     */
    sessionStorage.setItem(`codemirror-${this.lang}`, JSON.stringify({
      codemirror: {
        value: this.editor.getValue(),
        mode: this.editor.getOption('mode')
      },
      current: this.current
    }))
  }
}
</script>

<style lang="sass" scoped>
.codemirror-component
  height: 100%
  position: relative

.editor-bar
  padding: .5em 1.2em
  background-color: #f7f7f7
  .el-dropdown-link
    font-family: 'Ubuntu'
    cursor: pointer
    outline: none
    color: #777
    user-select: none
    font-size: 13px
    letter-spacing: .15em
</style>

<style lang="sass">
.editor-wrap
  position: absolute
  top: 34px
  bottom: 0
  width: 100%
  > .CodeMirror
    height: 100%
</style>

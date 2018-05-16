import Vue from 'vue'
import { Object as Obj, Query } from 'leancloud-storage'
import { raw as user } from '@/api/user.api'

const SnippetsModel = Obj.extend('snippets')

function snippetsQuery () {
  return tinyQuery()
    .include('name')
    .include('createdAt')
    .include('js_pre')
    .include('css_pre')
    .descending('updatedAt')
}

function tinyQuery () {
  return new Query('snippets')
    .equalTo('owner', user())
}

const snippetState = new Vue({
  data: {
    snippet: null,
    id: null,
    user: null
  },
  computed: {
    value () {
      return this.snippet
    }
  },
  methods: {
    create () {
      this.snippet = new SnippetsModel()
    },
    createWithId (uid) {
      this.snippet = Obj.createWithoutData('snippets', uid)
    },
    createWithInstance (instance) {
      this.snippet = instance
    },
    fetch () {
      return new Promise((resolve, reject) => {
        this.snippet
          .fetch()
          .then(resolve, reject)
      })
    },
    delete (instance) {
      return new Promise((resolve, reject) => {
        instance = instance || this.snippet

        instance
          .destroy()
          .then(resolve, reject)
      })
    },
    set (data) {
      for (let field in data) {
        this.snippet.set(field, data[field])
      }
    },
    destroy () {
      this.snippet = null
    },
    hasInstance () {
      return this.snippet !== null
    },
    save () {
      return new Promise((resolve, reject) => {
        if (!this.snippet.get('owner')) {
          this.snippet.set('owner', user())
        }

        this.snippet
          .save()
          .then((snippet) => {
            if (this.uid) {
              this.uid = snippet.id
            }
            resolve()
          }, reject)
      })
    },
    list (page, pageSize) {
      const query = snippetsQuery()

      return new Promise((resolve, reject) => {
        query
          .skip((page - 1) * pageSize)
          .limit(pageSize)
          .find()
          .then(resolve, reject)
      })
    },
    meta (pageSize) {
      const query = tinyQuery()

      return new Promise((resolve, reject) => {
        query
          .find()
          .then((results) => {
            resolve([results.length, Math.ceil(results.length / pageSize)])
          }, reject)
      })
    }
  }
})

export default function install (Vue) {
  Object.defineProperties(Vue.prototype, {
    '$snippet': {
      value: snippetState
    }
  })
}

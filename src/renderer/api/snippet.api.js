import { Object, Query } from 'leancloud-storage'
import { raw as user } from './user.api'

const SnippetsModel = Object.extend('snippets')

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

export default class Snippet {
  constructor (uid) {
    if (!uid) {
      this.snippet = new SnippetsModel()
      return this
    }

    if (typeof uid === 'string') {
      this.uid = uid
      this.snippet = Object.createWithoutData('snippets', uid)
      return this
    }

    this.uid = uid.id
    this.snippet = uid
  }

  delete () {
    return new Promise((resolve, reject) => {
      this.snippet
        .destroy()
        .then(resolve, reject)
    })
  }

  get () {
    return new Promise((resolve, reject) => {
      this.snippet
        .fetch()
        .then((snippet) => {
          resolve(this.snippet = snippet)
        }, reject)
    })
  }

  set (data) {
    for (let field in data) {
      this.snippet.set(field, data[field])
    }
  }

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
  }

  static list (page, pageSize) {
    const query = snippetsQuery()

    return new Promise((resolve, reject) => {
      query
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .find()
        .then(resolve, reject)
    })
  }

  static meta (pageSize) {
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

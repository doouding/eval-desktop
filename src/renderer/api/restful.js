/**
 * @fileoverview Encapsulation for leanCloud RESTful api
 */

/**
 * Usage:
 *
 * let request = new ApiBase(option[, requestCustom])
 * request.create(someData)     // create a resource
 * request.update(id, someData) // update a resource
 * request.delete(id)           // delete a resource
 * request.get(id)              // get a resource
 * request.list()     // query to get a lists of object
 * */
import HttpClient from './http-client'

export default class RESTful {
  constructor (url, options) {
    this.baseURL = url
    this._httpClient = new HttpClient(options)
    this._entities = {}
  }

  registerEntity (url, alias, block = []) {
    this._entities[alias] = new Entity(this._httpClient, url, alias, block)
  }
}

class Entity {
  constructor (httpclient, url, alias, block) {
    this._httpclient = httpclient
    this._url = url[url.length - 1] === '/' ? url.slice(0, -1) : url
    this._block = block
    this._alias = alias
  }

  update (id, data, params = null, headers = []) {
    if (this._block.includes('update')) {
      return Promise.reject(new Error(`Update action on ${this._alias} has been blocked.`))
    }

    return this._httpclient.put(this._url + `/${id}`, data, params, headers)
  }

  get (id, params = null, headers = []) {
    if (this._block.includes('get')) {
      return Promise.reject(new Error(`Get action on ${this._alias} has been blocked.`))
    }

    return this._httpclient.get(this._url + `/${id}`, params, headers)
  }

  list (params = null, headers = []) {
    if (this._block.includes('list')) {
      return Promise.reject(new Error(`List action on ${this._alias} has been blocked.`))
    }

    return this._httpclient.get(this._url, params, headers)
  }

  create (data, params = null, headers = []) {
    if (this._block.includes('create')) {
      return Promise.reject(new Error(`Create action on ${this._alias} has been blocked.`))
    }

    return this._httpclient.post(this._url, data, params, headers)
  }

  delete (id, data, params = null, headers = []) {
    if (this._block.includes('delete')) {
      return Promise.reject(new Error(`Delete action on ${this._alias} has been blocked.`))
    }

    return this._httpclient.delete(this._url + `/${id}`, data, params, headers)
  }
}

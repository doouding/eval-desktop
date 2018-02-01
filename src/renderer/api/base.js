/**
 * @fileoverview RESTful api base class
 */

/**
 * Usage:
 *
 * let request = new ApiBase(option[, fetchOption, requestCustom])
 * request.create(someData)     // create a resource
 * request.update(id, someData) // update a resource
 * request.delete(id)           // delete a resource
 * request.get(id)              // get a resource
 * request.get(queryParams)     // query to get a lists of object
 *
 * One required argument:
 *  option: {
 *    baseURL:  // the basic url, eg: https://leancloud.cn/
 *    version:  // api version, eg: 1.0
 *    resource: // the resource, eg: blog
 *  }
 *  the properties above will be used to make a complete url as request url prefix
 *  eg: https://leancloud.cn/1.0/blog
 *
 * Two optional arguments:
 *  By default, fetch use the generated prefix url as request url (Such as https://leancloud.cn/1.0/blog we show above). 
 *  However, sometimes we may want to use a different url in some request.
 *  Moreover, we want specify method (you can check TYPE_METHOD_MAP object to see default method), headers.
 *  That's what requestCustom does.
 *  requestCustom: {
 *    'create': {
 *      'url': 'https://anotherurl.com/2.3/' // must provide a full valide url,
 *      'method': 'put'                      // use put method instead of post
 *      'headers': {}                        // provide some external headers
 *    }
 *  }
 *
 *  fetchOption: {
 *    // check fetch api on mozilla for more detail :)
 *  }
 */
import 'whatwg-fetch'

const TYPE_METHOD_MAP = {
  'create': 'post',
  'update': 'put',
  'delete': 'delete',
  'get': 'get'
}

export default class ApiBase {
  constructor (options = {}, fetchOption = {}, requestCustom = {}) {
    switch (true) {
      case !options.hasOwnProperty('baseURL'):
      case !options.hasOwnProperty('version'):
        return
    }

    this.requestCustom = requestCustom
    this.baseURL = `${options.baseURL}/${options.version}/${options.resource}`
    this.fetchOption = fetchOption
  }

  _getFetchOption (type) {
    return Object.assign({}, {
      method: (this.requestCustom[type] && this.requestCustom[type].method) || TYPE_METHOD_MAP[type]
    }, this.fetchOption)
  }

  _getFetchURL (type) {
    return (this.requestCustom[type].url && this.requestCustom[type].url) || this.baseURL
  }

  update () {
    /**
     * Default method is put.
     * You can custom url and method by pass custom argument
     */
    return fetch(this._getFetchURL('update'), this._getFetchOption('update'))
  }

  get () {
    /**
     * Default method is get.
     * You can custom url and method by pass custom argument
     */
    return fetch(this._getFetchURL('get'), this._getFetchOption('get'))
  }

  create () {
    /**
     * Default method is post.
     * You can custom url and method by pass custom argument
     */
    return fetch(this._getFetchURL('create'), this._getFetchOption('create'))
  }

  delete () {
    /**
     * Default method is delete.
     * You can custom url and method by pass custom argument
     */
    return fetch(this._getFetchURL('delete'), this._getFetchOption('delete'))
  }
}

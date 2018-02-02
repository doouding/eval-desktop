/**
 * @fileoverview Fetch api's simple encapsulation
 */

function resolveOption (option) {
  return {
    mode: option.cors,
    credentials: option.cookie
  }
}

function dataStringify (data) {
  return JSON.stringify(data)
}

function paramsEncode (params) {
  let result = ''

  for (let item in params) {
    result += `&${item}=${params[item]}`
  }

  return result.slice(1)
}

function URLAssembleFactory (base) {
  if (base !== '') {
    base = base[base.length - 1] === '/' ? '' : '/'
  }

  return function URLAssemble (url, params) {
    let encodedParams = paramsEncode(params)

    if (encodedParams !== '') {
      encodedParams = '?' + encodedParams
    }

    if (url[0] === '/') {
      url = url.slice(1)
    }

    return base + url + encodedParams
  }
}

function reqAssembleFactory (stringify, fetchOption, headers) {
  return function reqAssemble (method, data, reqHeaders) {
    return Object.assign({
      headers: new Headers(headers.concat(reqHeaders))
    },
    {
      method: method.toUpperCase(),
      body: stringify(data)
    }, fetchOption)
  }
}

export default class HttpClient {
  constructor (option) {
    const DEFAULT_OPTION = {
      contentType: 'application/json',
      cookie: 'same-origin',
      cors: 'cors'
    }

    let fetchOption = resolveOption(Object.assign(DEFAULT_OPTION, option))

    this.URLAssemble = URLAssembleFactory(option.baseURL || '')
    this.reqAssemble = reqAssembleFactory(option.dataStringify || dataStringify, fetchOption, option.headers || [])
  }

  get (url, params = null, headers = []) {
    return fetch(this.URLAssemble(url, params),
      this.reqAssemble('get', null, headers))
  }

  post (url, data, params = null, headers = []) {
    return fetch(this.URLAssemble(url, params),
      this.reqAssemble('post', data, headers))
  }

  put (url, data, params = null, headers = []) {
    return fetch(this.URLAssemble(url, params),
      this.reqAssemble('put', data, headers))
  }

  delete (url, data, params = null, headers = []) {
    return fetch(this.URLAssemble(url, params),
      this.reqAssemble('delete', data, headers))
  }
}

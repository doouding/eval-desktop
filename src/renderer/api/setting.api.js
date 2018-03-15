import { Object } from 'leancloud-storage'
import DEFAULT_SETTING from '../config/setting'
import * as user from './user.api'

const Setting = Object.extend('setting')

export function create () {
  let setting = new Setting()
  setting.set('value', JSON.stringify(DEFAULT_SETTING))
  return setting
}

export function fetch () {
  let objectId = user.raw().get('setting').get('objectId')
  let instance = Setting.createWithoutData('setting', objectId).fetch()

  return new Promise((resolve, reject) => {
    instance
      .then(() => {
        resolve(instance)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

/**
 * Update setting
 * @param {*} modified json stringified setting string
 */
export function update (modified) {
  let objectId = user.raw().get('setting').get('objectId')
  let setting = Setting.createWithoutData('setting', objectId)

  setting.set('value', JSON.stringify(modified))

  return setting.save()
}

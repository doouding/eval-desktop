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
        console.log(e)
        reject(e)
      })
  })
}

export function update (setting, modify) {
  let newSetting = Object.assign(JSON.parse(setting.get('value')), modify)

  setting.set('value', JSON.stringify(newSetting))

  return setting.save()
}

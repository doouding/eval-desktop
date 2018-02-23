import { Object } from 'leancloud-storage'
import DEFAULT_SETTING from '../config/setting'

const Setting = Object.extend('setting')

export function create () {
  let setting = new Setting()
  setting.set('value', JSON.stringify(DEFAULT_SETTING))
  return setting
}

export function update (setting, modify) {
  let newSetting = Object.assign(JSON.parse(setting.get('value')), modify)

  setting.set('value', JSON.stringify(newSetting))

  return setting.save()
}

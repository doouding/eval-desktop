import AV from 'leancloud-storage'
import config from '@/config'

/** init LeanCloud SDK */
AV.init({
  appId: config.AppID,
  appKey: config.AppKey
})

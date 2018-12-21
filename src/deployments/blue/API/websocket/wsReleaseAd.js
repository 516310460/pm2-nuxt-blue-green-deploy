import { axios } from '~/plugins/axios'
import im from '~/plugins/websocket'
import qs from 'qs'

const wsReleaseAd = {

  // 初次进入页面, 获得全部币种的市场参考价格..
  getMarketReferencePrice(params) {
    const postData = qs.stringify(params)
    let ajax = axios.create({
      baseURL: im.webSocketHttpUrl
    })
    return ajax.post(`/api/v1/bitbuy/im/system/common/firstLoadMarketDetail`, postData)
  }
}

export { wsReleaseAd }

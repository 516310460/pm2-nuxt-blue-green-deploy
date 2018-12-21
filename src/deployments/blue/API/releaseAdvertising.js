/*
*
* 我的广告
*
* */

import { axios } from '~/plugins/axios'
import qs from 'qs'

const releaseAdvertising = {
  
  // 获取防止重复提交reToken
  getReSubmintToken() {
    return axios.post('/api/v1/bitbuy/otc/system/common/getReSubmintToken')
  },
  
  // 获得广告列表数据
  getAdData(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/ad/userPage', postData)
  },

  // 点击下架弹窗里的"确认"..
  affirmSoldOut(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/ad/off', postData)
  },

  // 点击上架..
  clickPutaway(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/ad/update', postData)
  }

}

export {releaseAdvertising}

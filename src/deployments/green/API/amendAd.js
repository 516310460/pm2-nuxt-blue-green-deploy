/*
 *
 * 修改广告
 *
 * */

import { axios } from '~/plugins/axios'
import qs from 'qs'

const amendAd = {
  
  // 获取防止重复提交reToken
  getReSubmintToken() {
    return axios.post('/api/v1/bitbuy/otc/system/common/getReSubmintToken')
  },

  // 获得用户的支付方式
  getAllPayType(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/payment/getAllPayment', postData)
  },

  // 获取广告详情
  getAdInfo(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/ad/get', postData)
  },

  // 发布广告.
  releaseAd(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/ad/update', postData)
  }

}

export {amendAd}

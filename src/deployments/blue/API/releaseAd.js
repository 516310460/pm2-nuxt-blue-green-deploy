/*
*
* 发布广告
*
* */
import { axios } from '~/plugins/axios'
import qs from 'qs'

const releaseAd = {

  // 获取防止重复提交reToken
  getReSubmintToken() {
    return axios.post('/api/v1/bitbuy/otc/system/common/getReSubmintToken')
  },

  // 获得广告列表数据
  getAllPayType(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/payment/getAllPayment', postData)
  },

  // 获得广告列表数据
  getAllCurrencyType(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/currency/findAll', postData)
  },

  // 发布广告..
  releaseAd(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/ad/add', postData)
  }

}

export {releaseAd}

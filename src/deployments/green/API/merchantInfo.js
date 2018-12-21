/*
 *
 *商家信息
 *
 * */

import { axios } from '~/plugins/axios'
import qs from 'qs'

const merchantInfo = {

  // 获取防止重复提交reToken
  getReSubmintToken() {
    return axios.post('/api/v1/bitbuy/otc/system/common/getReSubmintToken')
  },

  // 获得商家详细信息..
  getMerchantInfo(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/ad/getByGuest', postData)
  },

  // 获得表格数据..
  getTableData(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/ad/pageByGuest', postData)
  },

  // 获得所有认证信息..
  getAccountSafe(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/getAccountSafe', postData)
  },

  // 获得所有支付方式..
  getAllPayment(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/payment/getAllPayment', postData)
  },

  // 检查用户是否开启了支付方式
  getOpenedPayment(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/payment/getOpenedPayment', postData)
  },

  // 获取订单ID..
  getOrderId(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/order/add', postData)
  }

}

export {merchantInfo}

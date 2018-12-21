import { axios } from '~/plugins/axios'
import qs from 'qs'

const currencyDeal = {

  // 获取防止重复提交reToken
  getReSubmintToken() {
    return axios.post('/api/v1/bitbuy/otc/system/common/getReSubmintToken')
  },

  // 请求所有的币种
  getAllCurrencyType(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/currency/findAll', postData)
  },

  // 获取下方订单列表的数据
  getOrder(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/order/topList', postData)
  },

  // 获取广告状态数据
  getStatusInfo(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/ad/getStatusInfo', postData)
  },

  // 点击"确认下单", 获取订单ID..
  getOrderId(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/order/add', postData)
  },

  // 获取用户的认证信息..
  getAccountSafe(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/getAccountSafe', postData)
  },

  // 获取用户的所有支付方式..
  getAllPayment(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/payment/getAllPayment', postData)
  },

  // 检查用户是否开启了支付方式
  getOpenedPayment(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/payment/getOpenedPayment', postData)
  }

}

export {currencyDeal}

/*
 *
 * 买单
 *
 * */
import { axios } from '~/plugins/axios'
import qs from 'qs'

const buy = {

  // 获取防止重复提交reToken
  getReSubmintToken() {
    return axios.post('/api/v1/bitbuy/otc/system/common/getReSubmintToken')
  },

  // 获取订单详情
  getDetail(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/order/detail', postData)
  },

  // 点击"确认已付款"..
  ConfirmedAccountPaid(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/order/next', postData)
  },

  // 取消订单
  cancel(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/order/cancel', postData)
  },

  // 点击"申诉"弹框中"提交"..
  protestOrder(params, conf) {
    return axios.post('/api/v1/bitbuy/otc/order/complain', params, conf)
  },

  // 取消"申诉"..
  cancelComplain(params, conf) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/order/cancelComplain', postData, conf)
  },

  // 获得系统时间..
  getSysTime(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/system/common/getSysTime', postData)
  },

  // 获得取消次数..
  getCancelNum(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/order/count24HourCancel', postData)
  }

}

export {buy}

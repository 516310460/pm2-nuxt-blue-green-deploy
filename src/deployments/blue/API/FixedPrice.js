import { axios } from '~/plugins/axios'
import qs from 'qs'

const FixedPrice = {

  // 获取买单参考价
  getDepositConfig(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/fixprice/order/getDepositConfig', postData)
  },
  
  // 获取系统配置信息..
  getConfig(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/system/common/getConfig', postData)
  },

  // 获得系统时间..
  getSysTime(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/system/common/getSysTime', postData)
  },

  // 获取防止重复提交reToken
  getReSubmintToken() {
    return axios.post('/api/v1/bitbuy/otc/system/common/getReSubmintToken')
  },

  // 获取最大、最小、步骤数
  loadCoinLimitInfo() {
    return axios.post('/api/v1/bitbuy/fixprice/common/loadCoinLimitInfo')
  },

  // 我的订单分页列表
  getFixedPricePage(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/fixprice/order/page', postData)
  },

  // 获得广告列表数据
  getFixedPriceList(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/fixprice/order/topList', postData)
  },

  // 查询用户单个币种余额
  getBalanceByAssetType(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/businessAddress/getBalanceByAssetType', postData)
  },

  // 添加订单
  getFixedPriceOrderAdd(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/fixprice/order/add', postData)
  },

  // 订单预下单详情
  preDetail(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/fixprice/order/preDetail', postData)
  },

  // 订单详情
  getFixedPriceOrderDetail(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/fixprice/order/detail', postData)
  },

  firstLoadFixPirce(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/fixprice/common/firstLoadFixPirce', postData)
  },

  // 申诉
  complain: (params, config) => {
    return axios.post('/api/v1/bitbuy/fixprice/order/complain', params, config)
  },

  // 取消申诉
  cancelComplain(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/fixprice/order/cancelComplain', postData)
  },

  // 确认已付款、已收款
  ConfirmPayment(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/fixprice/order/next', postData)
  }

}

export { FixedPrice }

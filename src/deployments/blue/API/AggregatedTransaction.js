import { axios } from '~/plugins/axios'
import qs from 'qs'

const AggregatedTransaction = {

  // 获取系统配置信息..
  getExponent(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/auction/detail/getExponent', postData)
  },
  
  // 判断该币种在平台是否有钱包..
  walletExist(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/auction/detail/walletExist', postData)
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

  // 获取所有的基准币
  getCoinTypeList() {
    return axios.post('/api/v1/bitbuy/auction/coinType/basic')
  },

  // 根据基准币获取交易对
  getCoinTypeBasic(params) {
    const postData = qs.stringify(params)
    return axios.post(`/api/v1/bitbuy/auction/coinType/getByCoinBase`, postData)
  },

  // 获取最新竞价池
  getNewestAuctionPool(params) {
    const postData = qs.stringify(params)
    return axios.post(`/api/v1/bitbuy/auction/pool/getNewestAuctionPool`, postData)
  },

  // 加入竞价池
  joinAuction(params) {
    const postData = qs.stringify(params)
    return axios.post(`/api/v1/bitbuy/auction/detail/joinAuction`, postData)
  },

  // 获取竞价池数量
  getJoinAuctionPool(params) {
    const postData = qs.stringify(params)
    return axios.post(`/api/v1/bitbuy/auction/detail/getJoinAuctionPool`, postData)
  },

  // 撤销竞价池数量
  revocationAuction(params) {
    const postData = qs.stringify(params)
    return axios.post(`/api/v1/bitbuy/auction/detail/revocationAuction`, postData)
  },

  // 我的兑换
  getMyExchange(params) {
    const postData = qs.stringify(params)
    return axios.post(`/api/v1/bitbuy/auction/detail/getJoinAuctionDetail`, postData)
  },

  // 我的订单
  getMyOrderDeal(params) {
    const postData = qs.stringify(params)
    return axios.post(`/api/v1/bitbuy/auction/record/getAuctionRecordByUserId`, postData)
  },

  // 我的订单操作
  getMyOrderOperation(params) {
    const postData = qs.stringify(params)
    return axios.post(`/api/v1/bitbuy/auction/record/verify`, postData)
  },

  // 我的订单详情
  getAuctionRecordById(params) {
    const postData = qs.stringify(params)
    return axios.post(`/api/v1/bitbuy/auction/record/getAuctionRecordById`, postData)
  },

  // 获取所有币种列表
  getAllCoin() {
    return axios.post(`/api/v1/bitbuy/auction/coinType/getAllCoin`)
  },

  // 获取所有地址
  getAllAdress(params) {
    const postData = qs.stringify(params)
    return axios.post(`/api/v1/bitbuy/auction/coinAddress/getAllAdress`, postData)
  },

  // 添加币种地址
  addAdress(params) {
    const postData = qs.stringify(params)
    return axios.post(`/api/v1/bitbuy/auction/coinAddress/addAdress`, postData)
  },

  // 删除币种地址
  deleteAdress(params) {
    const postData = qs.stringify(params)
    return axios.post(`/api/v1/bitbuy/auction/coinAddress/deleteAdress`, postData)
  },

  // 设置该默认币种地址
  setAdressDefault(params) {
    const postData = qs.stringify(params)
    return axios.post(`/api/v1/bitbuy/auction/coinAddress/setAdressDefault`, postData)
  },

  // 更新参考指数和竞价池数量
  getPoolCoinAmount(params) {
    const postData = qs.stringify(params)
    return axios.post(`/api/v1/bitbuy/auction/pool/getPoolCoinAmount`, postData)
  }

}

export {AggregatedTransaction}

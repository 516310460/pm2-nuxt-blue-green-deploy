/*
*
* 转出BTC
*
* */

import { axios } from '~/plugins/axios'
import qs from 'qs'

const rollOutBtc = {

  // 获取当前币种的手续费
  getServiceCharge(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/businessAddress/getPoundage', postData)
  },

  // 提币
  withdrawMoney(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/businessAddress/withdrawMoney', postData)
  },

  // 点击删除弹框里的确认按钮
  removeAddress(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/assetAddress/delete', postData)
  },

  // 获取用户某个币种钱包地址
  getAssetAdress(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/assetAddress/getAssetAdressByType', postData)
  },

  // 点击手动添加地址模态框的"确定"按钮..
  submitForm(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/assetAddress/add', postData)
  },

  // 获得单个币种的余额
  getBalanceByAssetType(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/businessAddress/getBalanceByAssetType', postData)
  },

  //  点击验证码按钮..
  clickAuthCodeBtn(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/getCodeEmail', postData)
  }

}

export {rollOutBtc}

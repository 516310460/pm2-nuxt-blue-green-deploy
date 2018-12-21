/*
*
*个人中心
*
* */

import { axios } from '~/plugins/axios'
import qs from 'qs'

const personCenter = {

  // 获取系统配置信息..
  getConfig(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/system/common/getConfig', postData)
  },

  // 获得个人中心订单统计..
  getOrderCount(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/order/count', postData)
  },

  // 绑定手机号码..
  bindPhone(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/updateMobileState', postData)
  },

  // 关闭谷歌验证码..
  updateGoogleCode(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/updateGoogleAuthenticatorCode', postData)
  },

  // 实名认证..(传递图片)
  authentication(params, conf) {
    return axios.post('/api/v1/bitbuy/otc/authentication/authentication', params, conf)
  },
  // 高级认证..(传递图片)
  certified(params, conf) {
    return axios.post('/api/v1/bitbuy/otc/authentication/certified', params, conf)
  },
  // 获取用户认证信息..
  getAuthenticationInfo(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/authentication/getAuthentication', postData)
  },

  // 更新支付状态..
  updatePayStatus(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/payment/updatePayStatus', postData)
  },

  // 删除支付状态..
  delPayType(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/payment/delete', postData)
  },

  //  获取登录日志
  getLoginLog(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/getLoginLog', postData)
  },

  //  添加收款方式
  addPayType(params, conf) {
    return axios.post('/api/v1/bitbuy/otc/payment/add', params, conf)
  },

  // 获得所有收款方式..
  getAllPayType(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/payment/getAllPayment', postData)
  },

  //  设置/修改资金密码
  updateCapitalPassword(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/updateCapitalPassword', postData)
  },

  //  验证谷歌验证码
  checkGoogleCode(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/checkGoogleAuthenticatorCode', postData)
  },

  //  开启谷歌验证码
  addGoogleAuthenticator(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/checkAndAddGoogleAuthenticatorCode', postData)
  },

  //  点击谷歌验证码"设置"..
  googleAuthSet(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/getGoogleAuthenticatorCode', postData)
  },

  //  获取账户的安全信息..
  getAccountInfo(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/getAccountSafe', postData)
  },

  //  修改昵称"确认"
  amendNickName(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/updateNickName', postData)
  },

  //  修改登录密码"确认"..
  editLoginPassword(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/updateLoginPassword', postData)
  },

  //  点击验证码按钮..
  clickAuthCodeBtn(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/getCodeEmail', postData)
  },
 //  获取短信验证码..
 clickAuthPhoneCodeBtn(params) {
  const postData = qs.stringify(params)
  return axios.post('/api/v1/bitbuy/otc/bitbuyer/getCodePhone', postData)
},
  //  检验支付方式是否在使用..
  checkPaymentlslnUse(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/order/checkPaymentIsInUse', postData)
  }

}

export {personCenter}

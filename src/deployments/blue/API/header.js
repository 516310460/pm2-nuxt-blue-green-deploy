/*
*
* 头部
*
* */

import { axios } from '~/plugins/axios'
import qs from 'qs'

const header = {

  // 切换语言给后端传递语言
  setLan(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/setLan', postData)
  },

  // 验证谷歌验证码
  checkGoogleCode(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/checkGoogleAuthenticatorCodeByLogin', postData)
  },

  // 获取注册的验证码
  getRegCode(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/getCodeEmail', postData)
  },

  // 点击"注册"..
  clickReg(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/reg', postData)
  },

  // 获取重置的验证码..
  getResetCode(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/getCodeEmail', postData)
  },

  // 点击"重置密码"....
  clickReset(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/resetLoginPassword', postData)
  },

  // 注销..
  logoff(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/logOff', postData)
  },

  // 获取认证信息..
  getAuthentication(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/authentication/getAuthentication', postData)
  },

  // 弹框中输入邮箱, 失去焦点,判断账号是否存在..
  judgeRegEmail(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/getOrCheckAccountSafe', postData)
  },

  // 请求登录的验证图片..
  getAuthImgUrl(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/getVerfityCode', postData)
  }

}

export {header}

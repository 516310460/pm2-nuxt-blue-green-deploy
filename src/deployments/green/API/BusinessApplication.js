/*
*
* 商家认证
*
* */
import { axios } from '~/plugins/axios'
import qs from 'qs'

const BusinessApplication = {

  // 获取用户安全信息
  getAuthenticationInfo(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/authentication/getAuthentication', postData)
  },

  // 获取用户认证信息
  getAccountSafe(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/getAccountSafe', postData)
  },

  // 申请认证商家
  applyCertifiedBusiness(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/authentication/applyCertifiedBusiness', postData)
  }

}

export {BusinessApplication}

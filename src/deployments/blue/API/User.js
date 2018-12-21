import { axios } from '~/plugins/axios'
import qs from 'qs'

const User = {

  // 获取查询所有币种余额
  getAllBalance() {
    return axios.post('/api/v1/bitbuy/otc/businessAddress/getAllBalance')
  },

  // 获取钱包地址
  getAssetAdressByType(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/assetAddress/getAssetAdressByType', postData)
  },

  // 验证登录密码（登录）
  checkLoginPassword(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/bitbuyer/checkLoginPassword', postData)
  }

}

export { User }

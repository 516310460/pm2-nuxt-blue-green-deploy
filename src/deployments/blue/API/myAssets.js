import { axios } from '~/plugins/axios'
import qs from 'qs'

const myAssets = {

  // 获取用户认证信息..
  getAuthenticationInfo(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/authentication/getAuthentication', postData)
  },

  // 查询所有资产变更记录..
  getAllBalanceDetail(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/businessAddress/getAllBalanceDetail', postData)
  },

  // 查询所有币种余额..
  getAllBalance(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/businessAddress/getAllBalance', postData)
  },

  // 查询用户单个币种地址
  getByAssetType(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/businessAddress/getByAssetType', postData)
  },

  // 获得一口价商家所有资产变更明细..
  getFixPriceAllBalanceDetail(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/fixprice/usd/trans/getAllBalanceDetail', postData)
  },

  // 获得一口价商家所有资产..
  getFixPriceAllAssets(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/fixprice/usdt/balanceAndFrozen', postData)
  }

}

export {myAssets}

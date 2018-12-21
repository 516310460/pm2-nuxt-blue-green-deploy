import { axios } from '~/plugins/axios'
import qs from 'qs'

const Home = {

  // 获得广告列表数据
  getAdvertisementList(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/ad/page', postData)
  },

  // 获取下方订单列表的数据
  getOrderList(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/order/topList', postData)
  }

}

export {Home}

/*
*
* 我的订单
*
* */
import { axios } from '~/plugins/axios'
import qs from 'qs'

const myOrder = {

  // 获得订单列表
  getOrder(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/order/page', postData)
  }

}

export {myOrder}

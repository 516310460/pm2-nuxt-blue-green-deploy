import { axios } from '~/plugins/axios'
import im from '~/plugins/websocket'
import qs from 'qs'

const wsBuy = {

  // 获得所有的聊天消息列表
  getChatInfoList(params) {
    const postData = qs.stringify(params)
    let ajax = axios.create({
      baseURL: im.webSocketHttpUrl,
      headers: {
        token: JSON.parse(window.localStorage.getItem('buybit')).token
      }
    })
    return ajax.post(`/api/v1/bitbuy/im/msg/page`, postData)
  },

  // 点击聊天框的'发送'..
  sendInfo(params) {
    const postData = qs.stringify(params)
    let ajax = axios.create({
      baseURL: im.webSocketHttpUrl,
      headers: {
        token: JSON.parse(window.localStorage.getItem('buybit')).token
      }
    })
    return ajax.post(`/api/v1/bitbuy/im/msg/send`, postData)
  },

  // 获取消息中心所有消息数量
  countNotRead() {
    let ajax = axios.create({
      baseURL: im.webSocketHttpUrl,
      headers: {
        token: JSON.parse(window.localStorage.getItem('buybit')).token
      }
    })
    return ajax.post(`/api/v1/bitbuy/im/msg/countNotRead`)
  },

  // 获取消息中心所有消息内容
  pageUserMsg(params) {
    const postData = qs.stringify(params)
    let ajax = axios.create({
      baseURL: im.webSocketHttpUrl,
      headers: {
        token: JSON.parse(window.localStorage.getItem('buybit')).token
      }
    })
    return ajax.post(`/api/v1/bitbuy/im/msg/pageUserMsg`, postData)
  },

  // 全部标记为已读
  readAll(params) {
    let ajax = axios.create({
      baseURL: im.webSocketHttpUrl,
      headers: {
        token: JSON.parse(window.localStorage.getItem('buybit')).token
      }
    })
    return ajax.post(`/api/v1/bitbuy/im/msg/readAll`)
  }
  ,

  // 获取未处理订单条数
  countAllNotDone(params) {
    let ajax = axios.create({
      headers: {
        token: JSON.parse(window.localStorage.getItem('buybit')).token
      }
    })
    return ajax.post(`/api/v1/bitbuy/otc/order/countAllNotDone`)
  },
   // 获取未处理订单列表
   findAllNotDone(params) {
    let ajax = axios.create({
      headers: {
        token: JSON.parse(window.localStorage.getItem('buybit')).token
      }
    })
    return ajax.post(`/api/v1/bitbuy/otc/order/findAllNotDone`)
  },
 
}

export { wsBuy }

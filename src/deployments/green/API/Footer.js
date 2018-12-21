/*
 *
 * 公共底部
 *
 * */

import { axios } from '~/plugins/axios'
import qs from 'qs'

const Footer = {

  // 获取新手帮助
  listByLanguage(params){
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/newbieHelp/listByLanguage',postData)
  },

  // 获取新手帮助详情
  getByIdAndLanguage(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/newbieHelp/getByIdAndLanguage', postData)
  },

  // 获得公告列表
  listByState(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/notice/listByState', postData)
  },

  // 获得公告详情
  getById(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/notice/getById', postData)
  },

  // 列表 1.常见问题 ,2.新手帮助3.交易规则,4.服务协议
  listHelpCenterByType(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/helpCenter/listHelpCenterByType', postData)
  },

  // 获得列表详情 1.常见问题 ,2.新手帮助3.交易规则,4.服务协议
  getHelpCenterById(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/helpCenter/getHelpCenterById', postData)
  },

}

export {Footer}

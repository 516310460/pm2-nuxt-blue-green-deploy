/*
*
* 公告列表
*
* */
import { axios } from '~/plugins/axios'
import qs from 'qs'

const Notice = {

  // 获得公告列表
  listByState() {
    return axios.post('/api/v1/bitbuy/otc/notice/listByState')
  },

  // 获得公告列表
  getById(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/notice/getById', postData)
  }

}

export {Notice}

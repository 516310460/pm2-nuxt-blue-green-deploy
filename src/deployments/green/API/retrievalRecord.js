/*
*
* 提币记录
*
* */

import { axios } from '~/plugins/axios'
import qs from 'qs'

const retrievalRecord = {

  // 获取提币记录..
  getRetrievalRecord(params) {
    const postData = qs.stringify(params)
    return axios.post('/api/v1/bitbuy/otc/assetAddress/financialOrder', postData)
  }

}

export {retrievalRecord}

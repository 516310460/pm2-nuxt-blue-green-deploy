<template>
  <section class="AT">
    <section class="AT-Content bk01">
      <div class="AT-Content-Title content cl17 fs12">
        <i class="el-icon-otc_body_icon_wuxin "></i>
        我的订单
      </div>
      <bt-MyOrder/>
    </section>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  name: 'AggregatedTransaction-MyOrder',
  components: {
  },
  asyncData ({ params, error }) {
  },
  head () {
    return {
      title: `User: BuyBit`
    }
  },
  data () {
    return {

    }
  },
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .AT{
    .AT-Content{
      min-height: 682px;
      .AT-Content-Title{
        padding: 16px 0;
        i{
          margin-right: 10px;
        }
      }
    }
  }
</style>

<template>
  <section class="AT">
    <section class="AT-Content bk01">
      <div class="AT-Content-Title content cl17 fs12">
        <i class="el-icon-otc_body_icon_wuxin "></i>
        {{$t('OTC.MyOrder.title')}}
      </div>
      <bt-OTCMyOrder :data-type="'page'"/>
    </section>
  </section>
</template>

<script>
export default {
  name: 'OTC-MyOrder',
  head () {
    return {
      title: this.$t('OTC.MyOrder.headTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('OTC.MyOrder.headTitle') }
      ]
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
      min-height: 678px;
      .AT-Content-Title{
        padding: 16px 0;
        i{
          margin-right: 10px;
        }
      }
    }
  }
</style>

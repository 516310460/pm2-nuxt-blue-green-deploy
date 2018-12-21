<template>
  <section class="cl29">
    <section class="bk01">
      <section class="OTCNotice">
        <img src="~assets/img/currencyDeal/bitbuy_home_icon_laba.png" alt="">
        <div class="marquee_box">
          <ul class="marquee_list" :class="{marquee_top: animate}">
            <li v-for="(item, index) in NoticeList" :key="index">
              <nuxt-link class="cl12 fs12" tag="a" :to="`/${locale}/Public/Notice/Details/${item.id}`">{{item.title}}</nuxt-link>                
            </li>
          </ul>
        </div>
      </section>
      <bt-OTCFixedPrice/>
      <!-- <bt-OTC/> -->
      <!-- <bt-OTCMyOrder :data-type="'topList'" :page-size="MyOrderPageSize" :page-state="MyOrderPageState"/> -->
      <bt-OTCMyOrder :data-type="'page'" :page-size="MyOrderPageSize" :page-state="MyOrderPageState"/>
    </section>
  </section>
</template>

<script>
import { Footer } from "~/API/Footer.js";
export default {
  components: {
  },
  head () {
    return {
      title: this.$t('OTC.Home.headTitle'),
      meta: [
        { hid: 'description', name: 'description', content: this.$t('OTC.Home.headTitle') }
      ]
    }
  },
  data () {
    return {
      // MyOrderPageSize: 4,// 订单分页数
      MyOrderPageSize: 10,// 订单分页数
      // MyOrderPageState: false,// 订单是否分页
      MyOrderPageState: true,// 订单是否分页
      animate: false,
      locale: this.$store.state.locale,
      NoticeList: [],// 广告列表
      pageNum: 1,
      PageSize: 10
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      setInterval(this.showMarquee, 10000)
      this.InitData()
    });
  },
  methods: {
    InitData(){
      this.listByState()
    },
    listByState(){
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.PageSize
      }
      Footer.listByState(obj).then((res)=>{
        if(res.data.code == 200){
          this.NoticeList = res.data.data.items;
        }
      });
    },
    showMarquee() {
      this.animate = true;
      setTimeout (() => {
        this.NoticeList.push(this.NoticeList[0]);
        this.NoticeList.shift();
        this.animate = false;
      }, 500);
    }
  },

}
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .marquee_box {
    display: block;
    position: relative;
    height: 30px;
    overflow: hidden;
    .marquee_list {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      li {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        a {
          display: block;
        }
      }
    }
  }
  .marquee_top {
    transition: all 0.5s;
    margin-top: -30px
  }
  .OTCNotice{
    background-color: rgba(0, 0, 0, .2);
    position: relative;
    overflow: hidden;
    width: 760px;
    margin: 0 auto;
    img{
      display: block;
      float: left;
      line-height: 28px;
      margin: 5px auto;
    }
    .NoticeMarquee{
      display: block;
      float: left;
      height: 28px;
      line-height: 28px;
      width: 720px;
      padding-left: 20px;
      a{
        display: block;
        &:hover{
          color: $co09;
        }
      }
    }
  }
</style>

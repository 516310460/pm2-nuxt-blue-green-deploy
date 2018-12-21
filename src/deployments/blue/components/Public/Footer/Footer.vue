<template>
  <div class="Footer w100 bk06" >
    <el-footer class="content cl22">
      <div class="dis-flx">
        <div>
          <div class="Footer-Title dis-flx fs12 cl31">
            <div class="tl">
              <div class="cl16">{{$t('common.Footer.support')}}</div>
            </div>
            <div class="tl">
              <div class="cl16">{{$t('common.Footer.terms')}}</div>
            </div>
            <div class="tl">
              <div class="cl16">{{$t('common.Footer.server')}}</div>
            </div>
          </div>
          <div class="dis-flx fs12 Footer-Title-Content">
            <div class="tl">
              <nuxt-link tag="div" :to="`/${this.$store.state.locale}/Public/familiarQuestion`" class="hover_box cl17">{{$t('common.Footer.commonQuestion')}}</nuxt-link>
              <nuxt-link tag="div" :to="`/${this.$store.state.locale}/Public/newbieHelp`" class="hover_box cl17">{{$t('common.Footer.help')}}</nuxt-link>
              <nuxt-link tag="div" :to="`/${this.$store.state.locale}/Public/Notice`" class="hover_box cl17">{{$t('common.Footer.bulletin')}}</nuxt-link>
              <!-- <nuxt-link tag="div" :to="`/${this.$store.state.locale}/Public/submitSuggest`" class="hover_box cl17">{{$t('common.Footer.suggestion')}}</nuxt-link> -->
            </div>
            <div class="tl">
              <nuxt-link tag="div" :to="`/${this.$store.state.locale}/Public/AboutUs`" class="hover_box cl17">{{$t('common.Footer.AboutUs')}}</nuxt-link>
              <nuxt-link tag="div" :to="`/${this.$store.state.locale}/Public/ServiceAgreement`" class="hover_box cl17">{{$t('common.Footer.serverProtocol')}}</nuxt-link>
              <nuxt-link tag="div" :to="`/${this.$store.state.locale}/Public/transactionRules`" class="hover_box cl17">{{$t('common.Footer.rule')}}</nuxt-link>
              <nuxt-link tag="div" :to="`/${this.$store.state.locale}/Public/RateSpecification`" class="hover_box cl17">{{$t('common.Footer.info')}}</nuxt-link>
              <!-- <nuxt-link tag="div" :to="`/${this.$store.state.locale}/Public/registrationProtocol`" class="hover_box cl17">{{$t('common.Footer.UserAgreement')}}</nuxt-link> -->
              <nuxt-link tag="div" :to="`/${this.$store.state.locale}/Public/registrationProtocol`" class="hover_box cl17">{{$t('common.Footer.UserAgreement')}}</nuxt-link>
              <!-- <nuxt-link tag="div" :to="`/${this.$store.state.locale}/inviteFriend`" class="hover_box">邀请好友</nuxt-link> -->
            </div>
            <div class="tl">
              <div class="hover_box cl17">live@service.buybit.com</div>
              <!-- <div class="hover_box cl17">
                <a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=2eb04ec91a88ddb3ecb0b83bb938719ddb708e4b39f8309befc5475c1c14cd77"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="Vue/Nuxt" title="Vue/Nuxt"></a>
              </div> -->
              <div class="hover_box cl17">
                <el-dropdown style="margin-right:14px">
                  <img src="~assets/img/Footer/footer_qq.png" alt="">
                  <el-dropdown-menu slot="dropdown">
                    <img src="~assets/img/Footer/qq.png" class="qrcodeImg">
                  </el-dropdown-menu>
                </el-dropdown>
                <a target="_blank" href="https://www.facebook.com/Buybit-2242805032662089/?modal=admin_todo_tour">
                  <img src="~assets/img/Footer/facebook.png" style="margin-right:14px" alt="">
                </a>
                <a target="_blank" href="https://twitter.com/Buybit1">
                  <img src="~assets/img/Footer/twitter.png" alt="">
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="fs12 tl Footer-Content-Right">
          <img src="~assets/img/Footer/footer_logo.svg" alt="">
          <!-- <i class="element-icons el-icon-otc_logo cl32"></i> -->
          <p class="Footer-Logo cl35">{{$t('common.Footer.platform')}}</p>
          <!-- <img src="~assets/img/Footer/facebook.png" style="margin-right:14px" alt=""> -->
          <!-- <img src="~assets/img/Footer/twitter.png" alt=""> -->
          <p class="Footer-Logo cl35">© 2018 www.buybit.com</p>
        </div>
      </div>
    </el-footer>
  </div>
</template>
<script>
export default {
  name: 'Footer',
  components: {
  },
  data () {
    return {

    }
  },
  created () {
    
  },
  mounted () {
   
  },
  methods: {
    
  }
}
</script>

<style>
.el-dropdown-menu[x-placement^="top"] .popper__arrow::after {
  border-top-color: #ffffff !important;
}
.el-dropdown-menu[x-placement^="top"] .popper__arrow {
  border-top-color: #ffffff !important;
}
</style>

<style scoped rel="stylesheet/scss" lang="scss">
.el-dropdown-menu {
  width: 140px !important;
  height: 140px !important;
  .qrcodeImg{
    width: 140px;
    height: 140px;
  }
  .popper__arrow{
    border-top-color: #ffffff !important;
  }
}
.Footer{
  position: relative;
  overflow: hidden;
  .el-footer {
    text-align: center;
    padding: 20px 0;
    height: 230px !important;
  }
  .hover_box{
    margin-top: 15px;
    cursor: pointer;
  }
  .hover_box:hover {
    color: $co09;
  }
  .element-icons {
    font-size: 44px;
    margin-right: 6px;
  }
  .Footer-Title{
    width: 585px;
    margin-top: 25px;
    margin-right: 320px;
    padding: 0 20px;
  }
  .Footer-Title-Content{
    width: 585px;
    padding: 0 20px;
  }
  .Footer-Title>div>div, .Footer-Title-Content>div>div{
    min-width: 60px;
  }
  .Footer-Title>div:nth-child(1), .Footer-Title>div:nth-child(2), .Footer-Title>div:nth-child(3), .Footer-Title-Content>div:nth-child(1), .Footer-Title-Content>div:nth-child(2), .Footer-Title-Content>div:nth-child(3){
    flex: 1;
  }
  .Footer-Content-Right{
    margin-top: 17px;
    .Footer-Logo{
      margin: 0;
      padding: 5px 0;
    }
  }
}

</style>
